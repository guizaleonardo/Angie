import type { Criticidad, EstadoHallazgo, ItemResultado } from './index';

export type TickValor = true | false | 'NA' | null;
export type AccionHigiene = 'FR' | 'LM' | 'OM';
export type FiltroHallazgosAmb = 'todos' | 'alta' | 'sinval';

export interface PuntoVerificado {
  n: string;
  c: TickValor[];
}

export interface ObsHigiene {
  id: string;
  cargo: string;
  momento: string;
  accion: AccionHigiene;
}

export interface HallazgoAmb {
  id: string;
  scope: string;
  itemId: string;
  area: string;
  bloque: string;
  desc: string;
  criticidad: Criticidad;
  que: string;
  porque: string;
  donde: string;
  quien: string;
  cuando: string;
  como: string;
  estado: EstadoHallazgo;
  fechaCierre: string;
  evidencia: string;
  sugerido: boolean;
}

export interface VisitaAmb {
  id: string;
  sede: string;
  municipio: string;
  fecha: string;
  auditor: string;
  acompanantes: string;
  alcance: string;
  concl: string;
  areas: string[];
  transv: Record<string, ItemResultado>;
  areasRes: Record<string, Record<string, ItemResultado>>;
  puntosHM: PuntoVerificado[];
  puntosRT: PuntoVerificado[];
  obsHM: ObsHigiene[];
  hallazgos: HallazgoAmb[];
  seq: number;
}

export interface ConteoAmb {
  C: number;
  NC: number;
  NA: number;
  den: number;
  pct: number | null;
}

export interface ResumenPuntos {
  total: number;
  eval: number;
  conf: number;
  pct: number | null;
  fallas: number[];
}

export interface Adherencia {
  n: number;
  ok: number;
  fr: number;
  lm: number;
  om: number;
  pct: number | null;
}

export interface ResumenBloqueAmb extends ConteoAmb {
  cod: string;
  nom: string;
  tipo: 'Transversal' | 'Área';
}

export type VisitaCampo =
  | 'sede'
  | 'municipio'
  | 'fecha'
  | 'auditor'
  | 'acompanantes'
  | 'alcance'
  | 'concl';

export type HallazgoAmbCampo = Exclude<keyof HallazgoAmb, 'sugerido' | 'id' | 'scope' | 'itemId' | 'bloque'>;
