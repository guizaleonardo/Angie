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
import { itemPorId, itemsDeServicio, NOMBRE_BLOQUE } from '../data/rondas';
import { loadAppData, normalizeAppData, saveAppData, serializeBackup } from '../services/storage';
import type { AppData, Hallazgo, ResultadoEstado, Ronda } from '../types';
import { EMPTY_APP_DATA } from '../types';
import { hoy, nextPrefixedId, sumarDias } from '../utils/format';
import { useToast } from './ToastContext';

interface CrearRondaInput {
  servicioCod: string;
  fecha: string;
  lider: string;
  acompanantes: string;
}

type HallazgoCampo = Exclude<keyof Hallazgo, 'sugerido'>;

interface AppContextValue {
  data: AppData;
  crearRonda: (input: CrearRondaInput) => Ronda;
  borrarRonda: (id: string) => boolean;
  marcar: (rondaId: string, itemId: string, estado: ResultadoEstado) => void;
  setObservacionItem: (rondaId: string, itemId: string, obs: string) => void;
  setObservacionRonda: (rondaId: string, obs: string) => void;
  marcarTodo: (rondaId: string, estado: ResultadoEstado) => boolean;
  limpiarResultados: (rondaId: string) => boolean;
  crearHallazgo: (rondaId: string, itemId: string) => Hallazgo | null;
  generarPendientes: () => number;
  validarHallazgo: (id: string) => boolean;
  restaurarPropuesta: (id: string) => boolean;
  setHallazgoCampo: (id: string, campo: HallazgoCampo, valor: string) => void;
  borrarHallazgo: (id: string) => boolean;
  tieneHallazgo: (rondaId: string, itemId: string) => boolean;
  replaceData: (next: AppData) => void;
  borrarTodo: () => boolean;
  backupJSON: () => string;
  restoreFromJSON: (raw: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function nuevoHallazgo(seq: number, ronda: Ronda, itemId: string): { seq: number; hallazgo: Hallazgo } | null {
  const item = itemPorId(itemId);
  if (!item) return null;
  const next = nextPrefixedId(seq, 'H');
  const propuesta = item.prop;
  return {
    seq: next.seq,
    hallazgo: {
      id: next.id,
      rondaId: ronda.id,
      itemId,
      servicioCod: ronda.servicioCod,
      servicio: ronda.servicio,
      bloque: item.bloque,
      fecha: ronda.fecha,
      desc: ronda.resultados[itemId]?.obs || '',
      criticidad: propuesta?.criticidad ?? 'Media',
      que: propuesta?.que ?? '',
      porque: propuesta?.porque ?? '',
      donde: ronda.servicio,
      quien: propuesta?.quien ?? '',
      cuando: propuesta ? sumarDias(ronda.fecha, propuesta.plazo) : '',
      como: propuesta?.como ?? '',
      estado: 'Abierto',
      fechaCierre: '',
      evidencia: '',
      sugerido: Boolean(propuesta),
    },
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [data, setData] = useState<AppData>(() => loadAppData());
  const dataRef = useRef(data);
  dataRef.current = data;

  const commit = useCallback((next: AppData) => {
    dataRef.current = next;
    setData(next);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!saveAppData(data)) {
        toast('No se pudo guardar. Exporte sus datos antes de cerrar.');
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [data, toast]);

  const crearRonda = useCallback(
    (input: CrearRondaInput) => {
      const prev = dataRef.current;
      const { seq, id } = nextPrefixedId(prev.seq, 'R');
      const created: Ronda = {
        id,
        servicioCod: input.servicioCod,
        servicio: NOMBRE_BLOQUE[input.servicioCod] || input.servicioCod,
        fecha: input.fecha || hoy(),
        lider: input.lider.trim(),
        acompanantes: input.acompanantes.trim(),
        obs: '',
        resultados: {},
      };
      commit({ ...prev, seq, rondas: [...prev.rondas, created] });
      return created;
    },
    [commit],
  );

  const borrarRonda = useCallback(
    (id: string) => {
      if (!window.confirm(`Se elimina la ronda ${id} y sus hallazgos asociados. ¿Continuar?`)) {
        return false;
      }
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.filter((ronda) => ronda.id !== id),
        hallazgos: prev.hallazgos.filter((hallazgo) => hallazgo.rondaId !== id),
      });
      return true;
    },
    [commit],
  );

  const marcar = useCallback(
    (rondaId: string, itemId: string, estado: ResultadoEstado) => {
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.map((ronda) => {
          if (ronda.id !== rondaId) return ronda;
          const actual = ronda.resultados[itemId];
          const resultados = { ...ronda.resultados };
          if (actual?.r === estado) {
            delete resultados[itemId];
          } else {
            resultados[itemId] = { r: estado, obs: actual?.obs || '' };
          }
          return { ...ronda, resultados };
        }),
      });
    },
    [commit],
  );

  const setObservacionItem = useCallback(
    (rondaId: string, itemId: string, obs: string) => {
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.map((ronda) => {
          if (ronda.id !== rondaId) return ronda;
          const actual = ronda.resultados[itemId];
          if (!actual) return ronda;
          return {
            ...ronda,
            resultados: { ...ronda.resultados, [itemId]: { ...actual, obs } },
          };
        }),
      });
    },
    [commit],
  );

  const setObservacionRonda = useCallback(
    (rondaId: string, obs: string) => {
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.map((ronda) => (ronda.id === rondaId ? { ...ronda, obs } : ronda)),
      });
    },
    [commit],
  );

  const marcarTodo = useCallback(
    (rondaId: string, estado: ResultadoEstado) => {
      if (
        !window.confirm(
          `Se marcarán como "${estado}" los ítems que aún no tienen resultado. Úselo solo para agilizar y revise cada uno después. ¿Continuar?`,
        )
      ) {
        return false;
      }
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.map((ronda) => {
          if (ronda.id !== rondaId) return ronda;
          const resultados = { ...ronda.resultados };
          itemsDeServicio(ronda.servicioCod).forEach((item) => {
            if (!resultados[item.id]) resultados[item.id] = { r: estado, obs: '' };
          });
          return { ...ronda, resultados };
        }),
      });
      return true;
    },
    [commit],
  );

  const limpiarResultados = useCallback(
    (rondaId: string) => {
      if (!window.confirm('Se borran todos los resultados de esta ronda. ¿Continuar?')) return false;
      const prev = dataRef.current;
      commit({
        ...prev,
        rondas: prev.rondas.map((ronda) =>
          ronda.id === rondaId ? { ...ronda, resultados: {} } : ronda,
        ),
      });
      return true;
    },
    [commit],
  );

  const tieneHallazgo = useCallback(
    (rondaId: string, itemId: string) =>
      data.hallazgos.some((hallazgo) => hallazgo.rondaId === rondaId && hallazgo.itemId === itemId),
    [data.hallazgos],
  );

  const crearHallazgo = useCallback(
    (rondaId: string, itemId: string) => {
      const prev = dataRef.current;
      const ronda = prev.rondas.find((r) => r.id === rondaId);
      if (!ronda) return null;
      const built = nuevoHallazgo(prev.seq, ronda, itemId);
      if (!built) return null;
      commit({
        ...prev,
        seq: built.seq,
        hallazgos: [...prev.hallazgos, built.hallazgo],
      });
      return built.hallazgo;
    },
    [commit],
  );

  const generarPendientes = useCallback(() => {
    const prev = dataRef.current;
    let seq = prev.seq;
    const hallazgos = [...prev.hallazgos];
    let creados = 0;
    prev.rondas.forEach((ronda) => {
      Object.entries(ronda.resultados || {}).forEach(([itemId, valor]) => {
        if (valor.r !== 'NC') return;
        if (hallazgos.some((h) => h.rondaId === ronda.id && h.itemId === itemId)) return;
        const built = nuevoHallazgo(seq, ronda, itemId);
        if (!built) return;
        seq = built.seq;
        hallazgos.push(built.hallazgo);
        creados += 1;
      });
    });
    if (creados) commit({ ...prev, seq, hallazgos });
    return creados;
  }, [commit]);

  const validarHallazgo = useCallback(
    (id: string) => {
      const prev = dataRef.current;
      const existe = prev.hallazgos.some((h) => h.id === id);
      if (!existe) return false;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.map((hallazgo) =>
          hallazgo.id === id ? { ...hallazgo, sugerido: false } : hallazgo,
        ),
      });
      toast('Plan validado');
      return true;
    },
    [commit, toast],
  );

  const restaurarPropuesta = useCallback(
    (id: string) => {
      const prev = dataRef.current;
      const hallazgo = prev.hallazgos.find((h) => h.id === id);
      if (!hallazgo) return false;
      const item = itemPorId(hallazgo.itemId);
      if (!item?.prop) {
        toast('Este ítem no tiene propuesta en la biblioteca');
        return false;
      }
      if (!window.confirm('Se reemplaza el texto actual del plan por la propuesta de la biblioteca. ¿Continuar?')) {
        return false;
      }
      const propuesta = item.prop;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.map((h) =>
          h.id === id
            ? {
                ...h,
                criticidad: propuesta.criticidad,
                que: propuesta.que,
                porque: propuesta.porque,
                quien: propuesta.quien,
                como: propuesta.como,
                cuando: sumarDias(h.fecha, propuesta.plazo),
                sugerido: true,
              }
            : h,
        ),
      });
      return true;
    },
    [commit, toast],
  );

  const setHallazgoCampo = useCallback(
    (id: string, campo: HallazgoCampo, valor: string) => {
      const prev = dataRef.current;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.map((hallazgo) => {
          if (hallazgo.id !== id) return hallazgo;
          const next = { ...hallazgo, [campo]: valor };
          if (campo === 'estado' && valor === 'Cerrado' && !next.fechaCierre) {
            next.fechaCierre = hoy();
          }
          return next;
        }),
      });
    },
    [commit],
  );

  const borrarHallazgo = useCallback(
    (id: string) => {
      if (!window.confirm(`¿Eliminar el plan ${id}?`)) return false;
      const prev = dataRef.current;
      commit({
        ...prev,
        hallazgos: prev.hallazgos.filter((hallazgo) => hallazgo.id !== id),
      });
      return true;
    },
    [commit],
  );

  const replaceData = useCallback(
    (next: AppData) => {
      commit(next);
    },
    [commit],
  );

  const borrarTodo = useCallback(() => {
    if (!window.confirm('Se borran todas las rondas y planes. ¿Continuar?')) return false;
    if (!window.confirm('Confirme de nuevo: esta acción no se puede deshacer.')) return false;
    commit({ ...EMPTY_APP_DATA });
    return true;
  }, [commit]);

  const backupJSON = useCallback(() => serializeBackup(data), [data]);

  const restoreFromJSON = useCallback(
    (raw: string) => {
      const normalized = normalizeAppData(JSON.parse(raw));
      if (!normalized) throw new Error('invalid');
      if (!window.confirm('Se reemplazan los datos actuales por los del respaldo. ¿Continuar?')) {
        return false;
      }
      commit(normalized);
      return true;
    },
    [commit],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      data,
      crearRonda,
      borrarRonda,
      marcar,
      setObservacionItem,
      setObservacionRonda,
      marcarTodo,
      limpiarResultados,
      crearHallazgo,
      generarPendientes,
      validarHallazgo,
      restaurarPropuesta,
      setHallazgoCampo,
      borrarHallazgo,
      tieneHallazgo,
      replaceData,
      borrarTodo,
      backupJSON,
      restoreFromJSON,
    }),
    [
      data,
      crearRonda,
      borrarRonda,
      marcar,
      setObservacionItem,
      setObservacionRonda,
      marcarTodo,
      limpiarResultados,
      crearHallazgo,
      generarPendientes,
      validarHallazgo,
      restaurarPropuesta,
      setHallazgoCampo,
      borrarHallazgo,
      tieneHallazgo,
      replaceData,
      borrarTodo,
      backupJSON,
      restoreFromJSON,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}
