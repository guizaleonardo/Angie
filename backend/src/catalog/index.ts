import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Bloque, Catalogo, Item, ModalidadCatalogo } from '../types.js';
import { badRequest, notFound } from '../types.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const catalogDir = path.resolve(here, '../../catalog');

const cache = new Map<ModalidadCatalogo, CatalogRuntime>();

export interface CatalogRuntime extends Catalogo {
  itemById: Map<string, Item>;
  nombreBloque: Record<string, string>;
  bloquesTransversales: Bloque[];
  bloquesServicio: Bloque[];
  codigosTransversales: Set<string>;
}

function loadFile(id: ModalidadCatalogo): Catalogo {
  const file = path.join(catalogDir, `${id}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(
      `Falta catalog/${id}.json. Ejecute npm run sync-catalogs desde la carpeta backend.`,
    );
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Catalogo;
}

export function getCatalog(id: ModalidadCatalogo): CatalogRuntime {
  const cached = cache.get(id);
  if (cached) return cached;
  const raw = loadFile(id);
  const bloquesTransversales = raw.bloques.filter((b) => b.tipo === 'transversal');
  const bloquesServicio = raw.bloques.filter((b) => b.tipo === 'servicio');
  const runtime: CatalogRuntime = {
    ...raw,
    itemById: new Map(raw.items.map((item) => [item.id, item])),
    nombreBloque: Object.fromEntries(raw.bloques.map((b) => [b.codigo, b.nombre])),
    bloquesTransversales,
    bloquesServicio,
    codigosTransversales: new Set(bloquesTransversales.map((b) => b.codigo)),
  };
  cache.set(id, runtime);
  return runtime;
}

export function requireCatalog(id: string): CatalogRuntime {
  if (id !== 'hospitalaria' && id !== 'ambulatoria' && id !== 'principal') {
    throw badRequest(`Catálogo no válido: ${id}`);
  }
  return getCatalog(id);
}

export function itemPorId(catalog: CatalogRuntime, id: string): Item {
  const item = catalog.itemById.get(id);
  if (!item) throw notFound('Ítem', id);
  return item;
}

export function itemsDeServicio(catalog: CatalogRuntime, servicioCod: string): Item[] {
  return catalog.items.filter(
    (item) => catalog.codigosTransversales.has(item.bloque) || item.bloque === servicioCod,
  );
}

export function itemsTransversales(catalog: CatalogRuntime, activos?: string[]): Item[] {
  const allowed = activos?.length ? new Set(activos) : catalog.codigosTransversales;
  return catalog.items.filter((item) => catalog.codigosTransversales.has(item.bloque) && allowed.has(item.bloque));
}

export function itemsDeArea(catalog: CatalogRuntime, codigo: string): Item[] {
  return catalog.items.filter((item) => item.bloque === codigo);
}

export function publicCatalog(catalog: CatalogRuntime) {
  return {
    id: catalog.id,
    bloques: catalog.bloques,
    items: catalog.items,
    meta: catalog.meta,
    bloquesTransversales: catalog.bloquesTransversales,
    bloquesServicio: catalog.bloquesServicio,
    nombreBloque: catalog.nombreBloque,
  };
}
