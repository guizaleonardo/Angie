import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { loadVisita, normalizeVisita, saveVisita } from '../services/ambulatoriaStorage';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import type { ItemResultado, ResultadoEstado } from '../types';
import type {
  AccionHigiene,
  HallazgoAmb,
  HallazgoAmbCampo,
  TickValor,
  VisitaAmb,
  VisitaCampo,
} from '../types/ambulatoria';
import { nextTick, resDe, slotsVacios } from '../utils/ambulatoria';
import { nextPrefixedId, sumarDias } from '../utils/format';
import { AMBULATORIA_CONFIG, type VisitaConfig } from '../visita/config';
import { useToast } from './ToastContext';

export interface VisitaResumen {
  id: string;
  sede: string;
  fecha: string;
  auditor: string;
  hallazgos: number;
  NC?: number;
  pct?: number | null;
}

export interface AmbulatoriaContextValue {
  config: VisitaConfig;
  visita: VisitaAmb;
  historial: VisitaResumen[];
  setCampo: (campo: VisitaCampo, valor: string) => void;
  toggleArea: (codigo: string) => boolean;
  toggleBloque: (codigo: string) => boolean;
  setBloques: (codigos: string[]) => void;
  nuevaVisita: () => Promise<boolean>;
  abrirVisita: (id: string) => Promise<boolean>;
  marcar: (scope: string, itemId: string, estado: ResultadoEstado) => void;
  setObs: (scope: string, itemId: string, obs: string) => void;
  crearPlan: (scope: string, itemId: string) => HallazgoAmb | null;
  generarPendientes: () => number;
  setHallazgoCampo: (id: string, campo: HallazgoAmbCampo, valor: string) => void;
  validarHallazgo: (id: string) => boolean;
  borrarHallazgo: (id: string) => boolean;
  tienePlan: (scope: string, itemId: string) => boolean;
  addObsHM: (cargo: string, momento: string, accion: AccionHigiene) => void;
  delObsHM: (id: string) => void;
  addPunto: (tipo: 'HM' | 'RT') => void;
  delPunto: (tipo: 'HM' | 'RT', index: number) => void;
  setPuntoNombre: (tipo: 'HM' | 'RT', index: number, nombre: string) => void;
  tickPunto: (tipo: 'HM' | 'RT', index: number, col: number) => void;
  replaceVisita: (next: VisitaAmb) => boolean;
}

const AmbulatoriaContext = createContext<AmbulatoriaContextValue | null>(null);

function setResultado(visita: VisitaAmb, scope: string, itemId: string, patch: Partial<ItemResultado>): VisitaAmb {
  const merge = (prev: ItemResultado | undefined): ItemResultado | undefined => {
    const next = { ...(prev || {}), ...patch };
    if (!next.r) return undefined;
    return { r: next.r, obs: next.obs || '' };
  };
  if (scope === 'T') {
    const transv = { ...visita.transv };
    const next = merge(transv[itemId]);
    if (next) transv[itemId] = next;
    else delete transv[itemId];
    return { ...visita, transv };
  }
  const areaMap = { ...(visita.areasRes[scope] || {}) };
  const next = merge(areaMap[itemId]);
  if (next) areaMap[itemId] = next;
  else delete areaMap[itemId];
  return { ...visita, areasRes: { ...visita.areasRes, [scope]: areaMap } };
}

function nuevoHallazgo(
  visita: VisitaAmb,
  scope: string,
  itemId: string,
  config: VisitaConfig,
): { visita: VisitaAmb; hallazgo: HallazgoAmb } | null {
  const item = config.itemPorId(itemId);
  if (!item) return null;
  const { seq, id } = nextPrefixedId(visita.seq, 'H');
  const propuesta = item.prop;
  const area = scope === 'T' ? 'Toda la sede' : config.nombreBloque[scope] || scope;
  const hallazgo: HallazgoAmb = {
    id,
    scope,
    itemId,
    area,
    bloque: item.bloque,
    desc: resDe(visita, scope, itemId).obs || '',
    criticidad: propuesta?.criticidad ?? 'Media',
    que: propuesta?.que ?? '',
    porque: propuesta?.porque ?? '',
    donde: area,
    quien: propuesta?.quien ?? '',
    cuando: propuesta ? sumarDias(visita.fecha, propuesta.plazo) : '',
    como: propuesta?.como ?? '',
    estado: 'Abierto',
    fechaCierre: '',
    evidencia: '',
    sugerido: Boolean(propuesta),
  };
  return { visita: { ...visita, seq, hallazgos: [...visita.hallazgos, hallazgo] }, hallazgo };
}

export function VisitaProvider({ config, children }: { config: VisitaConfig; children: ReactNode }) {
  const { toast } = useToast();
  const { selectedUserId, user } = useAuth();
  const [visita, setVisita] = useState<VisitaAmb>(() => loadVisita(config.storageKey, config.createVisita));
  const [historial, setHistorial] = useState<VisitaResumen[]>([]);
  const visitaRef = useRef(visita);
  visitaRef.current = visita;
  const configRef = useRef(config);
  configRef.current = config;
  const skipSave = useRef(true);

  const commit = useCallback((next: VisitaAmb) => {
    visitaRef.current = next;
    setVisita(next);
  }, []);

  const cargarHistorial = useCallback(async () => {
    if (!selectedUserId) return;
    const list = await api<VisitaResumen[]>(
      `/visitas?modalidad=${config.id}&userId=${encodeURIComponent(selectedUserId)}`,
    );
    setHistorial(list);
  }, [config.id, selectedUserId]);

  useEffect(() => {
    if (!user || !selectedUserId) return;
    let cancelled = false;
    skipSave.current = true;
    (async () => {
      try {
        const data = await api<VisitaAmb>(
          `/visitas/activa?modalidad=${config.id}&userId=${encodeURIComponent(selectedUserId)}`,
        );
        if (cancelled) return;
        commit(normalizeVisita(data, config.createVisita) ?? config.createVisita());
        const list = await api<VisitaResumen[]>(
          `/visitas?modalidad=${config.id}&userId=${encodeURIComponent(selectedUserId)}`,
        );
        if (!cancelled) setHistorial(list);
      } catch {
        if (!cancelled) toast('No se pudo cargar la información de este usuario');
      } finally {
        window.setTimeout(() => {
          if (!cancelled) skipSave.current = false;
        }, 50);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [config, selectedUserId, user, commit, toast]);

  useEffect(() => {
    if (skipSave.current || !visita.id) return;
    const timer = window.setTimeout(() => {
      saveVisita(visita, config.storageKey);
      api(`/visitas/${visita.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...visita, modalidad: config.id, userId: selectedUserId }),
      }).catch(() => {
        toast('No se pudo guardar en el servidor. Descargue el respaldo antes de cerrar.');
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [visita, config.id, config.storageKey, selectedUserId, toast]);

  useEffect(() => {
    return () => {
      saveVisita(visitaRef.current, config.storageKey);
    };
  }, [config.storageKey]);

  const setCampo = useCallback(
    (campo: VisitaCampo, valor: string) => {
      commit({ ...visitaRef.current, [campo]: valor });
    },
    [commit],
  );

  const toggleArea = useCallback(
    (codigo: string) => {
      const prev = visitaRef.current;
      const nombre = configRef.current.nombreBloque[codigo] || codigo;
      if (prev.areas.includes(codigo)) {
        const tieneDatos = prev.areasRes[codigo] && Object.keys(prev.areasRes[codigo]).length;
        if (tieneDatos && !window.confirm(`El área ${nombre} ya tiene resultados. ¿Quitarla de la visita?`)) {
          return false;
        }
        commit({ ...prev, areas: prev.areas.filter((x) => x !== codigo) });
        return true;
      }
      const order = configRef.current.ordenAreas;
      const areas = [...prev.areas, codigo].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      commit({ ...prev, areas });
      return true;
    },
    [commit],
  );

  const toggleBloque = useCallback(
    (codigo: string) => {
      const prev = visitaRef.current;
      const cfg = configRef.current;
      const nombre = cfg.nombreBloque[codigo] || codigo;
      const actuales = prev.bloques.length ? prev.bloques : [...cfg.ordenBloques];
      if (actuales.includes(codigo)) {
        const conDatos = cfg
          .itemsTransversales({ ...prev, bloques: [codigo] })
          .some((i) => resDe(prev, 'T', i.id).r);
        if (conDatos && !window.confirm(`El bloque ${nombre} ya tiene resultados. ¿Quitarlo de la ronda?`)) {
          return false;
        }
        commit({ ...prev, bloques: actuales.filter((x) => x !== codigo) });
        return true;
      }
      const bloques = [...actuales, codigo].sort(
        (a, b) => cfg.ordenBloques.indexOf(a) - cfg.ordenBloques.indexOf(b),
      );
      commit({ ...prev, bloques });
      return true;
    },
    [commit],
  );

  const setBloques = useCallback(
    (codigos: string[]) => {
      const order = configRef.current.ordenBloques;
      commit({
        ...visitaRef.current,
        bloques: [...codigos].sort((a, b) => order.indexOf(a) - order.indexOf(b)),
      });
    },
    [commit],
  );

  const persistir = useCallback(
    async (current: VisitaAmb) => {
      saveVisita(current, configRef.current.storageKey);
      if (!current.id) return;
      await api(`/visitas/${current.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...current, modalidad: configRef.current.id, userId: selectedUserId }),
      });
    },
    [selectedUserId],
  );

  const nuevaVisita = useCallback(async () => {
    if (
      !window.confirm(
        'Se abre una visita nueva en blanco. La visita actual queda guardada en el historial. ¿Continuar?',
      )
    ) {
      return false;
    }
    skipSave.current = true;
    try {
      await persistir(visitaRef.current);
      const prev = visitaRef.current;
      const created = await api<VisitaAmb>('/visitas', {
        method: 'POST',
        body: JSON.stringify({
          modalidad: configRef.current.id,
          userId: selectedUserId,
          sede: prev.sede,
          municipio: prev.municipio,
        }),
      });
      commit(normalizeVisita(created, configRef.current.createVisita) ?? created);
      await cargarHistorial();
      toast('Visita nueva. La anterior quedó en el historial.');
      return true;
    } catch {
      toast('No se pudo crear la nueva visita');
      return false;
    } finally {
      window.setTimeout(() => {
        skipSave.current = false;
      }, 50);
    }
  }, [cargarHistorial, commit, persistir, selectedUserId, toast]);

  const abrirVisita = useCallback(
    async (id: string) => {
      if (id === visitaRef.current.id) return true;
      skipSave.current = true;
      try {
        await persistir(visitaRef.current);
        const data = await api<VisitaAmb>(`/visitas/${id}`);
        commit(normalizeVisita(data, configRef.current.createVisita) ?? data);
        return true;
      } catch {
        toast('No se pudo abrir esa visita');
        return false;
      } finally {
        window.setTimeout(() => {
          skipSave.current = false;
        }, 50);
      }
    },
    [commit, persistir, toast],
  );

  const marcar = useCallback(
    (scope: string, itemId: string, estado: ResultadoEstado) => {
      const prev = visitaRef.current;
      const actual = resDe(prev, scope, itemId).r;
      commit(setResultado(prev, scope, itemId, { r: actual === estado ? (undefined as unknown as ResultadoEstado) : estado }));
    },
    [commit],
  );

  const setObs = useCallback(
    (scope: string, itemId: string, obs: string) => {
      commit(setResultado(visitaRef.current, scope, itemId, { obs }));
    },
    [commit],
  );

  const crearPlan = useCallback(
    (scope: string, itemId: string) => {
      const created = nuevoHallazgo(visitaRef.current, scope, itemId, configRef.current);
      if (!created) return null;
      commit(created.visita);
      return created.hallazgo;
    },
    [commit],
  );

  const generarPendientes = useCallback(() => {
    let current = visitaRef.current;
    const cfg = configRef.current;
    let n = 0;
    const falta = (scope: string, itemId: string) =>
      resDe(current, scope, itemId).r === 'NC' &&
      !current.hallazgos.some((h) => h.itemId === itemId && h.scope === scope);

    cfg.itemsTransversales(current).forEach((item) => {
      if (!falta('T', item.id)) return;
      const created = nuevoHallazgo(current, 'T', item.id, cfg);
      if (created) {
        current = created.visita;
        n += 1;
      }
    });
    current.areas.forEach((area) => {
      cfg.itemsDeArea(area).forEach((item) => {
        if (!falta(area, item.id)) return;
        const created = nuevoHallazgo(current, area, item.id, cfg);
        if (created) {
          current = created.visita;
          n += 1;
        }
      });
    });
    commit(current);
    return n;
  }, [commit]);

  const setHallazgoCampo = useCallback(
    (id: string, campo: HallazgoAmbCampo, valor: string) => {
      const prev = visitaRef.current;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.map((h) => (h.id === id ? { ...h, [campo]: valor } : h)),
      });
    },
    [commit],
  );

  const validarHallazgo = useCallback(
    (id: string) => {
      const prev = visitaRef.current;
      if (!prev.hallazgos.some((h) => h.id === id)) return false;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.map((h) => (h.id === id ? { ...h, sugerido: false } : h)),
      });
      return true;
    },
    [commit],
  );

  const borrarHallazgo = useCallback(
    (id: string) => {
      if (!window.confirm(`¿Eliminar el plan ${id}?`)) return false;
      const prev = visitaRef.current;
      commit({ ...prev, hallazgos: prev.hallazgos.filter((h) => h.id !== id) });
      return true;
    },
    [commit],
  );

  const tienePlan = useCallback((scope: string, itemId: string) => {
    return visitaRef.current.hallazgos.some((h) => h.itemId === itemId && h.scope === scope);
  }, []);

  const addObsHM = useCallback(
    (cargo: string, momento: string, accion: AccionHigiene) => {
      const prev = visitaRef.current;
      commit({
        ...prev,
        obsHM: [
          ...prev.obsHM,
          {
            id: `O${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
            cargo,
            momento,
            accion,
          },
        ],
      });
    },
    [commit],
  );

  const delObsHM = useCallback(
    (id: string) => {
      const prev = visitaRef.current;
      commit({ ...prev, obsHM: prev.obsHM.filter((o) => o.id !== id) });
    },
    [commit],
  );

  const addPunto = useCallback(
    (tipo: 'HM' | 'RT') => {
      const prev = visitaRef.current;
      const punto = { n: '', c: slotsVacios(tipo === 'HM' ? 7 : 5) };
      commit({
        ...prev,
        [tipo === 'HM' ? 'puntosHM' : 'puntosRT']: [...(tipo === 'HM' ? prev.puntosHM : prev.puntosRT), punto],
      });
    },
    [commit],
  );

  const delPunto = useCallback(
    (tipo: 'HM' | 'RT', index: number) => {
      const prev = visitaRef.current;
      const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
      commit({ ...prev, [key]: prev[key].filter((_, i) => i !== index) });
    },
    [commit],
  );

  const setPuntoNombre = useCallback(
    (tipo: 'HM' | 'RT', index: number, nombre: string) => {
      const prev = visitaRef.current;
      const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
      commit({
        ...prev,
        [key]: prev[key].map((p, i) => (i === index ? { ...p, n: nombre } : p)),
      });
    },
    [commit],
  );

  const tickPunto = useCallback(
    (tipo: 'HM' | 'RT', index: number, col: number) => {
      const prev = visitaRef.current;
      const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
      commit({
        ...prev,
        [key]: prev[key].map((p, i) => {
          if (i !== index) return p;
          const c = [...p.c] as TickValor[];
          c[col] = nextTick(c[col] ?? null);
          return { ...p, c };
        }),
      });
    },
    [commit],
  );

  const replaceVisita = useCallback(
    (next: VisitaAmb) => {
      const normalized = normalizeVisita(next, configRef.current.createVisita);
      if (!normalized) return false;
      commit(normalized);
      return true;
    },
    [commit],
  );

  const value = useMemo(
    () => ({
      config,
      visita,
      historial,
      setCampo,
      toggleArea,
      toggleBloque,
      setBloques,
      nuevaVisita,
      abrirVisita,
      marcar,
      setObs,
      crearPlan,
      generarPendientes,
      setHallazgoCampo,
      validarHallazgo,
      borrarHallazgo,
      tienePlan,
      addObsHM,
      delObsHM,
      addPunto,
      delPunto,
      setPuntoNombre,
      tickPunto,
      replaceVisita,
    }),
    [
      config,
      visita,
      historial,
      setCampo,
      toggleArea,
      toggleBloque,
      setBloques,
      nuevaVisita,
      abrirVisita,
      marcar,
      setObs,
      crearPlan,
      generarPendientes,
      setHallazgoCampo,
      validarHallazgo,
      borrarHallazgo,
      tienePlan,
      addObsHM,
      delObsHM,
      addPunto,
      delPunto,
      setPuntoNombre,
      tickPunto,
      replaceVisita,
    ],
  );

  return <AmbulatoriaContext.Provider value={value}>{children}</AmbulatoriaContext.Provider>;
}

export function AmbulatoriaProvider({ children }: { children: ReactNode }) {
  return <VisitaProvider config={AMBULATORIA_CONFIG}>{children}</VisitaProvider>;
}

export function useAmbulatoria(): AmbulatoriaContextValue {
  const ctx = useContext(AmbulatoriaContext);
  if (!ctx) throw new Error('useAmbulatoria debe usarse dentro de VisitaProvider');
  return ctx;
}

export const useVisita = useAmbulatoria;
