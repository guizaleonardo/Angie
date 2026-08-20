export type TipoBloque = 'transversal' | 'servicio';
export type ResultadoEstado = 'C' | 'NC' | 'NA';
export type Criticidad = 'Alta' | 'Media' | 'Baja';
export type EstadoHallazgo = 'Abierto' | 'En ejecución' | 'Cerrado';
export type FiltroHallazgos = 'abiertos' | 'vencidos' | 'todos';

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
}

export interface AppData {
  rondas: Ronda[];
  hallazgos: Hallazgo[];
  seq: number;
}

export interface Conteo {
  C: number;
  NC: number;
  NA: number;
  den: number;
  total: number;
  pct: number | null;
}

export interface Agregado {
  C: number;
  NC: number;
  NA: number;
  pct: number | null;
}

export interface Nivel {
  t: string;
  c: string;
}

export interface ResultadoBloque {
  cod: string;
  nom: string;
  tipo: TipoBloque;
  C: number;
  NC: number;
  NA: number;
  pct: number | null;
}

export interface PuntoTendencia {
  k: string;
  v: number;
  n: number;
}

export interface FirmaActa {
  nombre: string;
  imagen: string;
}

export interface FirmasActa {
  seguridad: FirmaActa;
  coordinador: FirmaActa;
}

export const EMPTY_APP_DATA: AppData = {
  rondas: [],
  hallazgos: [],
  seq: 0,
};

export const CRITICIDADES: Criticidad[] = ['Alta', 'Media', 'Baja'];
export const ESTADOS_HALLAZGO: EstadoHallazgo[] = ['Abierto', 'En ejecución', 'Cerrado'];
export const RESULTADOS: ResultadoEstado[] = ['C', 'NC', 'NA'];
