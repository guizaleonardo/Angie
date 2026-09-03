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
import { AMB_BLOQUES_SERVICIO, AMB_NOMBRE_BLOQUE, itemAmbPorId, itemsDeArea, itemsTransversales } from '../data/ambulatoria';
import { loadVisita, normalizeVisita, saveVisita, visitaNueva } from '../services/ambulatoriaStorage';
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
import { useToast } from './ToastContext';

interface AmbulatoriaContextValue {
  visita: VisitaAmb;
  setCampo: (campo: VisitaCampo, valor: string) => void;
  toggleArea: (codigo: string) => boolean;
  reiniciar: () => boolean;
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

function nuevoHallazgo(visita: VisitaAmb, scope: string, itemId: string): { visita: VisitaAmb; hallazgo: HallazgoAmb } | null {
  const item = itemAmbPorId(itemId);
  if (!item) return null;
  const { seq, id } = nextPrefixedId(visita.seq, 'H');
  const propuesta = item.prop;
  const area = scope === 'T' ? 'Toda la sede' : AMB_NOMBRE_BLOQUE[scope] || scope;
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

export function AmbulatoriaProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [visita, setVisita] = useState<VisitaAmb>(() => loadVisita());
  const visitaRef = useRef(visita);
  visitaRef.current = visita;

  const commit = useCallback((next: VisitaAmb) => {
    visitaRef.current = next;
    setVisita(next);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!saveVisita(visita)) {
        toast('No se pudo guardar. Descargue el respaldo antes de cerrar.');
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [visita, toast]);

  const setCampo = useCallback(
    (campo: VisitaCampo, valor: string) => {
      commit({ ...visitaRef.current, [campo]: valor });
    },
    [commit],
  );

  const toggleArea = useCallback(
    (codigo: string) => {
      const prev = visitaRef.current;
      if (prev.areas.includes(codigo)) {
        const tieneDatos = prev.areasRes[codigo] && Object.keys(prev.areasRes[codigo]).length;
        if (tieneDatos && !window.confirm(`El área ${AMB_NOMBRE_BLOQUE[codigo] || codigo} ya tiene resultados. ¿Quitarla de la visita?`)) {
          return false;
        }
        commit({ ...prev, areas: prev.areas.filter((x) => x !== codigo) });
        return true;
      }
      const order = AMB_BLOQUES_SERVICIO.map((b) => b.codigo);
      const areas = [...prev.areas, codigo].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      commit({ ...prev, areas });
      return true;
    },
    [commit],
  );

  const reiniciar = useCallback(() => {
    if (!window.confirm('Se descarta la visita actual y sus resultados. ¿Descargó el respaldo?')) return false;
    commit(visitaNueva());
    return true;
  }, [commit]);

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
      const created = nuevoHallazgo(visitaRef.current, scope, itemId);
      if (!created) return null;
      commit(created.visita);
      return created.hallazgo;
    },
    [commit],
  );

  const generarPendientes = useCallback(() => {
    let current = visitaRef.current;
    let n = 0;
    const falta = (scope: string, itemId: string) =>
      resDe(current, scope, itemId).r === 'NC' &&
      !current.hallazgos.some((h) => h.itemId === itemId && h.scope === scope);

    itemsTransversales().forEach((item) => {
      if (!falta('T', item.id)) return;
      const created = nuevoHallazgo(current, 'T', item.id);
      if (created) {
        current = created.visita;
        n += 1;
      }
    });
    current.areas.forEach((area) => {
      itemsDeArea(area).forEach((item) => {
        if (!falta(area, item.id)) return;
        const created = nuevoHallazgo(current, area, item.id);
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
      const hallazgo = prev.hallazgos.find((h) => h.id === id);
      if (!hallazgo) return false;
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
      const normalized = normalizeVisita(next);
      if (!normalized) return false;
      commit(normalized);
      return true;
    },
    [commit],
  );

  const value = useMemo(
    () => ({
      visita,
      setCampo,
      toggleArea,
      reiniciar,
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
      visita,
      setCampo,
      toggleArea,
      reiniciar,
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

export function useAmbulatoria(): AmbulatoriaContextValue {
  const ctx = useContext(AmbulatoriaContext);
  if (!ctx) throw new Error('useAmbulatoria debe usarse dentro de AmbulatoriaProvider');
  return ctx;
}
