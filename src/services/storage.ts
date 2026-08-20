import { EMPTY_APP_DATA, type AppData, type Hallazgo, type Ronda } from '../types';

export const STORAGE_KEY = 'rsp:v1';
const LEGACY_KEYS = ['rsp_datos_v1', 'rondas-seguridad-paciente'];
const SCHEMA_VERSION = 1;

export function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null || raw === '') return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key: string): boolean {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function normalizeAppData(raw: unknown): AppData | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  if (!Array.isArray(source.rondas)) return null;

  return {
    rondas: source.rondas.map(normalizeRonda).filter((ronda): ronda is Ronda => ronda !== null),
    hallazgos: Array.isArray(source.hallazgos)
      ? source.hallazgos.map(normalizeHallazgo).filter((h): h is Hallazgo => h !== null)
      : [],
    seq: Number.isFinite(Number(source.seq)) ? Number(source.seq) : 0,
  };
}

function normalizeRonda(raw: unknown): Ronda | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  if (typeof source.id !== 'string' || !source.id) return null;
  const resultados =
    source.resultados && typeof source.resultados === 'object' && !Array.isArray(source.resultados)
      ? (source.resultados as Ronda['resultados'])
      : {};
  return {
    id: source.id,
    servicioCod: String(source.servicioCod || ''),
    servicio: String(source.servicio || ''),
    fecha: String(source.fecha || ''),
    lider: String(source.lider || ''),
    acompanantes: String(source.acompanantes || ''),
    obs: String(source.obs || ''),
    resultados,
  };
}

function normalizeHallazgo(raw: unknown): Hallazgo | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  if (typeof source.id !== 'string' || !source.id) return null;
  const criticidad = source.criticidad === 'Alta' || source.criticidad === 'Baja' ? source.criticidad : 'Media';
  const estado =
    source.estado === 'En ejecución' || source.estado === 'Cerrado' ? source.estado : 'Abierto';
  return {
    id: source.id,
    rondaId: String(source.rondaId || ''),
    itemId: String(source.itemId || ''),
    servicioCod: String(source.servicioCod || ''),
    servicio: String(source.servicio || ''),
    bloque: String(source.bloque || ''),
    fecha: String(source.fecha || ''),
    desc: String(source.desc || ''),
    criticidad,
    que: String(source.que || ''),
    porque: String(source.porque || ''),
    donde: String(source.donde || ''),
    quien: String(source.quien || ''),
    cuando: String(source.cuando || ''),
    como: String(source.como || ''),
    estado,
    fechaCierre: String(source.fechaCierre || ''),
    evidencia: String(source.evidencia || ''),
    sugerido: Boolean(source.sugerido),
  };
}

export function loadAppData(): AppData {
  try {
    for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const normalized = normalizeAppData(JSON.parse(raw));
      if (normalized) return normalized;
    }
  } catch {
    /* datos corruptos o localStorage no disponible */
  }
  return { ...EMPTY_APP_DATA };
}

export function saveAppData(data: AppData): boolean {
  return writeJSON(STORAGE_KEY, {
    version: SCHEMA_VERSION,
    rondas: data.rondas,
    hallazgos: data.hallazgos,
    seq: data.seq,
  });
}

export function serializeBackup(data: AppData): string {
  return JSON.stringify(
    {
      version: SCHEMA_VERSION,
      rondas: data.rondas,
      hallazgos: data.hallazgos,
      seq: data.seq,
    },
    null,
    1,
  );
}
