export type TipoBloque = 'transversal' | 'servicio';
export type ResultadoEstado = 'C' | 'NC' | 'NA';
export type Criticidad = 'Alta' | 'Media' | 'Baja';
export type EstadoHallazgo = 'Abierto' | 'En ejecución' | 'Cerrado';
export type TickValor = true | false | 'NA' | null;
export type AccionHigiene = 'FR' | 'LM' | 'OM';
export type ModalidadVisita = 'ambulatoria' | 'principal';
export type ModalidadCatalogo = 'hospitalaria' | ModalidadVisita;

export const CRITICIDADES: Criticidad[] = ['Alta', 'Media', 'Baja'];
export const ESTADOS_HALLAZGO: EstadoHallazgo[] = ['Abierto', 'En ejecución', 'Cerrado'];
export const RESULTADOS: ResultadoEstado[] = ['C', 'NC', 'NA'];

export interface Bloque {
  codigo: string;
  nombre: string;
  tipo: TipoBloque;
}

export interface PropuestaPlan {
  criticidad: Criticidad;
  plazo: number;
  quien: string;
  que: string;
  porque: string;
  como: string;
}

export interface Item {
  id: string;
  bloque: string;
  bloque_nombre: string;
  tipo: TipoBloque;
  item: string;
  referencia: string;
  fuente: string;
  nota: string;
  prop?: PropuestaPlan;
}

export interface ItemResultado {
  r: ResultadoEstado;
  obs?: string;
}

export interface Ronda {
  id: string;
  servicioCod: string;
  servicio: string;
  fecha: string;
  lider: string;
  acompanantes: string;
  obs: string;
  resultados: Record<string, ItemResultado>;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hallazgo {
  id: string;
  rondaId: string;
  itemId: string;
  servicioCod: string;
  servicio: string;
  bloque: string;
  fecha: string;
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
  userId: string;
}

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

export interface Visita {
  id: string;
  modalidad: ModalidadVisita;
  userId: string;
  sede: string;
  municipio: string;
  fecha: string;
  auditor: string;
  acompanantes: string;
  alcance: string;
  concl: string;
  areas: string[];
  bloques: string[];
  transv: Record<string, ItemResultado>;
  areasRes: Record<string, Record<string, ItemResultado>>;
  puntosHM: PuntoVerificado[];
  puntosRT: PuntoVerificado[];
  obsHM: ObsHigiene[];
  hallazgos: HallazgoAmb[];
  seq: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppData {
  version: number;
  rondas: Ronda[];
  hallazgos: Hallazgo[];
  seq: number;
}

export interface CatalogMeta {
  chkHM?: string[];
  chkRT?: string[];
  momentos?: Array<[string, string]>;
  cargos?: string[];
  acciones?: Array<[string, string]>;
  areasDefault?: string[];
  sedeDefault?: string;
  municipioDefault?: string;
  allowToggleBloques?: boolean;
  presets?: Array<{ label: string; bloques: string[] }>;
}

export interface Catalogo {
  id: ModalidadCatalogo;
  bloques: Bloque[];
  items: Item[];
  meta: CatalogMeta;
}

export interface Conteo {
  C: number;
  NC: number;
  NA: number;
  den: number;
  total: number;
  pct: number | null;
}

export class HttpError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'error') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function notFound(entity: string, id?: string): HttpError {
  return new HttpError(404, id ? `${entity} ${id} no encontrado` : `${entity} no encontrado`, 'not_found');
}

export function badRequest(message: string, code = 'bad_request'): HttpError {
  return new HttpError(400, message, code);
}

export function forbidden(message: string, code = 'forbidden'): HttpError {
  return new HttpError(403, message, code);
}

export function unauthorized(message: string, code = 'unauthorized'): HttpError {
  return new HttpError(401, message, code);
}
