import type { AccionHigiene, HallazgoAmb, ObsHigiene, PuntoVerificado, TickValor, VisitaAmb } from '../types/ambulatoria';
import type { ItemResultado } from '../types';
import { AREAS_DEFAULT } from '../data/ambulatoria';
import { hoy } from '../utils/format';
import { readJSON, writeJSON } from './storage';

export const AMB_STORAGE_KEY = 'rsp_sede_v1';

export function visitaNueva(): VisitaAmb {
  return {
    id: `V-${hoy().replace(/-/g, '')}`,
    sede: 'Sede Famisanar Barrancabermeja',
    municipio: 'Barrancabermeja, Santander',
    fecha: hoy(),
    auditor: '',
    acompanantes: '',
    alcance: '',
    concl: '',
    areas: [...AREAS_DEFAULT],
    transv: {},
    areasRes: {},
    puntosHM: [],
    puntosRT: [],
    obsHM: [],
    hallazgos: [],
    seq: 0,
  };
}

function normalizeResultado(raw: unknown): ItemResultado | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  if (source.r !== 'C' && source.r !== 'NC' && source.r !== 'NA') return null;
  return { r: source.r, obs: source.obs == null ? '' : String(source.obs) };
}

function normalizeMap(raw: unknown): Record<string, ItemResultado> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const out: Record<string, ItemResultado> = {};
  Object.entries(raw as Record<string, unknown>).forEach(([id, value]) => {
    const parsed = normalizeResultado(value);
    if (parsed) out[id] = parsed;
  });
  return out;
}

function normalizeTick(raw: unknown): TickValor {
  if (raw === true || raw === false || raw === 'NA') return raw;
  return null;
}

function normalizePunto(raw: unknown, slots: number): PuntoVerificado | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  const cells = Array.isArray(source.c) ? source.c.map(normalizeTick) : [];
  while (cells.length < slots) cells.push(null);
  return { n: String(source.n || ''), c: cells };
}

function normalizeObs(raw: unknown): ObsHigiene | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  const accion: AccionHigiene =
    source.accion === 'FR' || source.accion === 'LM' || source.accion === 'OM' ? source.accion : 'OM';
  const id = typeof source.id === 'string' && source.id ? source.id : `O${Date.now()}`;
  return {
    id,
    cargo: String(source.cargo || ''),
    momento: String(source.momento || '1'),
    accion,
  };
}

function normalizeHallazgo(raw: unknown): HallazgoAmb | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  if (typeof source.id !== 'string' || !source.id) return null;
  const criticidad = source.criticidad === 'Alta' || source.criticidad === 'Baja' ? source.criticidad : 'Media';
  const estado =
    source.estado === 'En ejecución' || source.estado === 'Cerrado' ? source.estado : 'Abierto';
  return {
    id: source.id,
    scope: String(source.scope || 'T'),
    itemId: String(source.itemId || ''),
    area: String(source.area || ''),
    bloque: String(source.bloque || ''),
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

export function normalizeVisita(raw: unknown): VisitaAmb | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  const base = visitaNueva();
  const areasResRaw =
    source.areasRes && typeof source.areasRes === 'object' && !Array.isArray(source.areasRes)
      ? (source.areasRes as Record<string, unknown>)
      : {};
  const areasRes: VisitaAmb['areasRes'] = {};
  Object.entries(areasResRaw).forEach(([cod, map]) => {
    areasRes[cod] = normalizeMap(map);
  });
  return {
    id: typeof source.id === 'string' && source.id ? source.id : base.id,
    sede: String(source.sede ?? base.sede),
    municipio: String(source.municipio ?? base.municipio),
    fecha: String(source.fecha || base.fecha),
    auditor: String(source.auditor || ''),
    acompanantes: String(source.acompanantes || ''),
    alcance: String(source.alcance || ''),
    concl: String(source.concl || ''),
    areas: Array.isArray(source.areas) ? source.areas.map(String) : [...base.areas],
    transv: normalizeMap(source.transv),
    areasRes,
    puntosHM: Array.isArray(source.puntosHM)
      ? source.puntosHM.map((p) => normalizePunto(p, 7)).filter((p): p is PuntoVerificado => p !== null)
      : [],
    puntosRT: Array.isArray(source.puntosRT)
      ? source.puntosRT.map((p) => normalizePunto(p, 5)).filter((p): p is PuntoVerificado => p !== null)
      : [],
    obsHM: Array.isArray(source.obsHM)
      ? source.obsHM.map(normalizeObs).filter((o): o is ObsHigiene => o !== null)
      : [],
    hallazgos: Array.isArray(source.hallazgos)
      ? source.hallazgos.map(normalizeHallazgo).filter((h): h is HallazgoAmb => h !== null)
      : [],
    seq: Number.isFinite(Number(source.seq)) ? Number(source.seq) : 0,
  };
}

export function loadVisita(): VisitaAmb {
  const stored = readJSON<unknown>(AMB_STORAGE_KEY);
  return normalizeVisita(stored) ?? visitaNueva();
}

export function saveVisita(visita: VisitaAmb): boolean {
  return writeJSON(AMB_STORAGE_KEY, visita);
}

export function serializeVisita(visita: VisitaAmb): string {
  return JSON.stringify(visita, null, 1);
}
