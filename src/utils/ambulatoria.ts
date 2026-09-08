import type { Item, ItemResultado } from '../types';
import type {
  Adherencia,
  ConteoAmb,
  ObsHigiene,
  PuntoVerificado,
  ResumenBloqueAmb,
  ResumenPuntos,
  TickValor,
  VisitaAmb,
} from '../types/ambulatoria';
import type { VisitaCatalog } from '../visita/config';
import { hoy } from './format';

export function resDe(visita: VisitaAmb, scope: string, id: string): Partial<ItemResultado> {
  if (scope === 'T') return visita.transv[id] || {};
  return visita.areasRes[scope]?.[id] || {};
}

export function cuenta(obj: Record<string, ItemResultado> | undefined, ids: string[]): ConteoAmb {
  let C = 0;
  let NC = 0;
  let NA = 0;
  ids.forEach((id) => {
    const valor = obj?.[id];
    if (!valor) return;
    if (valor.r === 'C') C += 1;
    else if (valor.r === 'NC') NC += 1;
    else if (valor.r === 'NA') NA += 1;
  });
  return { C, NC, NA, den: C + NC, pct: C + NC ? C / (C + NC) : null };
}

export function cuentaTransv(visita: VisitaAmb, catalog: VisitaCatalog): ConteoAmb {
  return cuenta(visita.transv, catalog.itemsTransversales(visita).map((i) => i.id));
}

export function cuentaArea(visita: VisitaAmb, codigo: string, catalog: VisitaCatalog): ConteoAmb {
  return cuenta(visita.areasRes[codigo] || {}, catalog.itemsDeArea(codigo).map((i) => i.id));
}

export function cuentaGlobal(visita: VisitaAmb, catalog: VisitaCatalog): ConteoAmb {
  let C = 0;
  let NC = 0;
  let NA = 0;
  const t = cuentaTransv(visita, catalog);
  C += t.C;
  NC += t.NC;
  NA += t.NA;
  visita.areas.forEach((area) => {
    const k = cuentaArea(visita, area, catalog);
    C += k.C;
    NC += k.NC;
    NA += k.NA;
  });
  return { C, NC, NA, den: C + NC, pct: C + NC ? C / (C + NC) : null };
}

export function puntosResumen(lista: PuntoVerificado[], chk: readonly string[]): ResumenPuntos {
  let conf = 0;
  let evaluados = 0;
  const fallas = chk.map(() => 0);
  lista.forEach((punto) => {
    const vals = chk.map((_, i) => punto.c[i] ?? null);
    if (vals.every((v) => v == null)) return;
    evaluados += 1;
    let ok = true;
    vals.forEach((v, i) => {
      if (v === false) {
        fallas[i] += 1;
        ok = false;
      }
    });
    if (ok) conf += 1;
  });
  return {
    total: lista.length,
    eval: evaluados,
    conf,
    pct: evaluados ? conf / evaluados : null,
    fallas,
  };
}

export function puntoEvaluado(vals: TickValor[]): boolean {
  return vals.some((v) => v != null);
}

export function puntoConforme(vals: TickValor[]): boolean {
  return puntoEvaluado(vals) && vals.every((v) => v !== false);
}

export function adherencia(obs: ObsHigiene[], filtro?: (o: ObsHigiene) => boolean): Adherencia {
  const lista = obs.filter(filtro || (() => true));
  const ok = lista.filter((o) => o.accion !== 'OM').length;
  return {
    n: lista.length,
    ok,
    fr: lista.filter((o) => o.accion === 'FR').length,
    lm: lista.filter((o) => o.accion === 'LM').length,
    om: lista.filter((o) => o.accion === 'OM').length,
    pct: lista.length ? ok / lista.length : null,
  };
}

export function totalNC(visita: VisitaAmb, catalog: VisitaCatalog): number {
  let n = 0;
  catalog.itemsTransversales(visita).forEach((item) => {
    if (resDe(visita, 'T', item.id).r === 'NC') n += 1;
  });
  visita.areas.forEach((area) => {
    catalog.itemsDeArea(area).forEach((item) => {
      if (resDe(visita, area, item.id).r === 'NC') n += 1;
    });
  });
  return n;
}

export function sinValidar(visita: VisitaAmb): number {
  return visita.hallazgos.filter((h) => h.sugerido && h.estado !== 'Cerrado').length;
}

export function bloquesResumen(visita: VisitaAmb, catalog: VisitaCatalog): ResumenBloqueAmb[] {
  const out: ResumenBloqueAmb[] = [];
  const activos = new Set(visita.bloques.length ? visita.bloques : catalog.ordenBloques);
  catalog.bloquesTransversales.forEach((bloque) => {
    if (!activos.has(bloque.codigo)) return;
    const ids = catalog.itemsTransversales(visita).filter((i) => i.bloque === bloque.codigo).map((i) => i.id);
    const k = cuenta(visita.transv, ids);
    if (k.den + k.NA) out.push({ cod: bloque.codigo, nom: bloque.nombre, ...k, tipo: 'Transversal' });
  });
  visita.areas.forEach((area) => {
    const k = cuentaArea(visita, area, catalog);
    if (k.den + k.NA) {
      out.push({
        cod: area,
        nom: catalog.nombreBloque[area] || area,
        ...k,
        tipo: 'Área',
      });
    }
  });
  return out;
}

export function ncsVisita(visita: VisitaAmb, catalog: VisitaCatalog): Array<{ area: string; item: Item; obs: string }> {
  const ncs: Array<{ area: string; item: Item; obs: string }> = [];
  catalog.itemsTransversales(visita).forEach((item) => {
    const v = resDe(visita, 'T', item.id);
    if (v.r === 'NC') ncs.push({ area: 'Toda la sede', item, obs: v.obs || '' });
  });
  visita.areas.forEach((area) => {
    catalog.itemsDeArea(area).forEach((item) => {
      const v = resDe(visita, area, item.id);
      if (v.r === 'NC') ncs.push({ area: catalog.nombreBloque[area] || area, item, obs: v.obs || '' });
    });
  });
  return ncs;
}

export function vencidoAmb(cuando: string, estado: string, fechaHoy = hoy()): boolean {
  return estado !== 'Cerrado' && Boolean(cuando) && cuando < fechaHoy;
}

export function nextTick(actual: TickValor): TickValor {
  if (actual == null) return true;
  if (actual === true) return false;
  if (actual === false) return 'NA';
  return null;
}

export function slotsVacios(n: number): TickValor[] {
  return Array.from({ length: n }, () => null);
}
