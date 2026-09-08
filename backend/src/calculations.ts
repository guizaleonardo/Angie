import { itemsDeServicio, type CatalogRuntime } from './catalog/index.js';
import type { Hallazgo, Item, Ronda } from './types.js';
import { hoy } from './utils.js';

export function conteo(ronda: Ronda, items?: Item[]): {
  C: number;
  NC: number;
  NA: number;
  den: number;
  total: number;
  pct: number | null;
} {
  let C = 0;
  let NC = 0;
  let NA = 0;
  Object.values(ronda.resultados || {}).forEach((v) => {
    if (v.r === 'C') C += 1;
    else if (v.r === 'NC') NC += 1;
    else if (v.r === 'NA') NA += 1;
  });
  const den = C + NC;
  const total = items?.length ?? Object.keys(ronda.resultados || {}).length;
  return { C, NC, NA, den, total, pct: den ? C / den : null };
}

export function conteoConCatalogo(ronda: Ronda, catalog: CatalogRuntime) {
  return conteo(ronda, itemsDeServicio(catalog, ronda.servicioCod));
}

export function nivel(p: number | null | undefined): { t: string; c: string } {
  if (p == null) return { t: 'Sin datos', c: 'p-na' };
  if (p >= 0.9) return { t: 'Óptimo', c: 'p-si' };
  if (p >= 0.75) return { t: 'Aceptable', c: 'p-mk' };
  if (p >= 0.6) return { t: 'Deficiente', c: 'p-al' };
  return { t: 'Crítico', c: 'p-no' };
}

export function vencido(hallazgo: Hallazgo, fechaHoy = hoy()): boolean {
  return hallazgo.estado !== 'Cerrado' && Boolean(hallazgo.cuando) && hallazgo.cuando < fechaHoy;
}

export function semaforoHallazgo(hallazgo: Hallazgo): string {
  if (hallazgo.estado === 'Cerrado') return 'Cerrado';
  if (vencido(hallazgo)) return 'Vencido';
  if (hallazgo.cuando) return 'En plazo';
  return 'Sin fecha';
}

export function agregado(rondas: Ronda[]) {
  let C = 0;
  let NC = 0;
  let NA = 0;
  rondas.forEach((ronda) => {
    const k = conteo(ronda);
    C += k.C;
    NC += k.NC;
    NA += k.NA;
  });
  return { C, NC, NA, pct: C + NC ? C / (C + NC) : null };
}
