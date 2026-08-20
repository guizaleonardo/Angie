import { itemPorId, itemsDeServicio } from '../data/rondas';
import type {
  Agregado,
  Conteo,
  Hallazgo,
  Item,
  Nivel,
  PuntoTendencia,
  ResultadoBloque,
  Ronda,
} from '../types';
import { hoy, periodo } from './format';

export function conteo(ronda: Ronda, items?: Item[]): Conteo {
  let C = 0;
  let NC = 0;
  let NA = 0;
  Object.values(ronda.resultados || {}).forEach((v) => {
    if (v.r === 'C') C += 1;
    else if (v.r === 'NC') NC += 1;
    else if (v.r === 'NA') NA += 1;
  });
  const den = C + NC;
  const total = (items ?? itemsDeServicio(ronda.servicioCod)).length;
  return { C, NC, NA, den, total, pct: den ? C / den : null };
}

export function nivel(p: number | null | undefined): Nivel {
  if (p == null) return { t: 'Sin datos', c: 'p-na' };
  if (p >= 0.9) return { t: 'Óptimo', c: 'p-si' };
  if (p >= 0.75) return { t: 'Aceptable', c: 'p-mk' };
  if (p >= 0.6) return { t: 'Deficiente', c: 'p-al' };
  return { t: 'Crítico', c: 'p-no' };
}

export function agregado(
  rondas: Ronda[],
  filtro?: (ronda: Ronda) => boolean,
): Agregado {
  let C = 0;
  let NC = 0;
  let NA = 0;
  rondas.filter(filtro ?? (() => true)).forEach((ronda) => {
    const k = conteo(ronda);
    C += k.C;
    NC += k.NC;
    NA += k.NA;
  });
  return { C, NC, NA, pct: C + NC ? C / (C + NC) : null };
}

export function vencido(hallazgo: Hallazgo, fechaHoy = hoy()): boolean {
  return hallazgo.estado !== 'Cerrado' && Boolean(hallazgo.cuando) && hallazgo.cuando < fechaHoy;
}

export function resultadosPorBloque(
  rondas: Ronda[],
  bloques: Array<{ codigo: string; nombre: string; tipo: ResultadoBloque['tipo'] }>,
): ResultadoBloque[] {
  return bloques
    .map((bloque) => {
      let C = 0;
      let NC = 0;
      let NA = 0;
      rondas.forEach((ronda) => {
        Object.entries(ronda.resultados || {}).forEach(([id, valor]) => {
          const item = itemPorId(id);
          if (item && item.bloque === bloque.codigo) {
            if (valor.r === 'C') C += 1;
            else if (valor.r === 'NC') NC += 1;
            else if (valor.r === 'NA') NA += 1;
          }
        });
      });
      return {
        cod: bloque.codigo,
        nom: bloque.nombre,
        tipo: bloque.tipo,
        C,
        NC,
        NA,
        pct: C + NC ? C / (C + NC) : null,
      };
    })
    .filter((bloque) => bloque.C + bloque.NC + bloque.NA > 0);
}

export function tendenciaPorPeriodo(rondas: Ronda[]): PuntoTendencia[] {
  const per: Record<string, { C: number; NC: number; n: number }> = {};
  rondas.forEach((ronda) => {
    const key = periodo(ronda.fecha);
    if (!key) return;
    const c = conteo(ronda);
    if (!c.den) return;
    per[key] = per[key] || { C: 0, NC: 0, n: 0 };
    per[key].C += c.C;
    per[key].NC += c.NC;
    per[key].n += 1;
  });
  return Object.keys(per)
    .sort()
    .map((key) => ({
      k: key,
      v: per[key].C / (per[key].C + per[key].NC),
      n: per[key].n,
    }));
}

export function noConformidadesRepetidas(
  rondas: Ronda[],
  limite = 8,
): Array<{ id: string; veces: number; item: string }> {
  const rep: Record<string, number> = {};
  rondas.forEach((ronda) => {
    Object.entries(ronda.resultados || {}).forEach(([id, valor]) => {
      if (valor.r === 'NC') rep[id] = (rep[id] || 0) + 1;
    });
  });
  return Object.entries(rep)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([id, veces]) => ({
      id,
      veces,
      item: itemPorId(id)?.item || '',
    }));
}

export function conteoBloqueEnRonda(
  ronda: Ronda,
  items: Item[],
): { C: number; NC: number; NA: number } {
  let C = 0;
  let NC = 0;
  let NA = 0;
  items.forEach((item) => {
    const valor = ronda.resultados[item.id]?.r;
    if (valor === 'C') C += 1;
    else if (valor === 'NC') NC += 1;
    else if (valor === 'NA') NA += 1;
  });
  return { C, NC, NA };
}

export function semaforoHallazgo(hallazgo: Hallazgo): string {
  if (hallazgo.estado === 'Cerrado') return 'Cerrado';
  if (vencido(hallazgo)) return 'Vencido';
  if (hallazgo.cuando) return 'En plazo';
  return 'Sin fecha';
}

export function planesAbiertos(hallazgos: Hallazgo[]): number {
  return hallazgos.filter((h) => h.estado !== 'Cerrado').length;
}

export function planesSinValidar(hallazgos: Hallazgo[]): number {
  return hallazgos.filter((h) => h.sugerido && h.estado !== 'Cerrado').length;
}
