import { ownerIdForCreate, ownerQuery } from '../auth/access.js';
import { getCatalog, itemPorId, itemsDeArea, itemsTransversales, type CatalogRuntime } from '../catalog/index.js';
import { VisitaModel, visitaToDto } from '../models/Visita.js';
import { badRequest, notFound, type AccionHigiene, type HallazgoAmb, type ItemResultado, type ModalidadVisita, type ResultadoEstado, type TickValor, type Visita } from '../types.js';
import { hoy, nextPrefixedId, sumarDias, toCsv } from '../utils.js';

function catalogOf(modalidad: ModalidadVisita): CatalogRuntime {
  return getCatalog(modalidad);
}

function visitaNueva(modalidad: ModalidadVisita, overrides: Partial<Visita> = {}): Omit<Visita, 'createdAt' | 'updatedAt'> {
  const catalog = catalogOf(modalidad);
  const bloques = catalog.bloquesTransversales.map((b) => b.codigo);
  return {
    id: overrides.id || `V-${hoy().replace(/-/g, '')}`,
    modalidad,
    userId: overrides.userId || ownerIdForCreate(),
    sede: overrides.sede ?? catalog.meta.sedeDefault ?? '',
    municipio: overrides.municipio ?? catalog.meta.municipioDefault ?? '',
    fecha: overrides.fecha || hoy(),
    auditor: overrides.auditor || '',
    acompanantes: overrides.acompanantes || '',
    alcance: overrides.alcance || '',
    concl: overrides.concl || '',
    areas: overrides.areas ?? [...(catalog.meta.areasDefault || [])],
    bloques: overrides.bloques ?? [...bloques],
    transv: overrides.transv ?? {},
    areasRes: overrides.areasRes ?? {},
    puntosHM: overrides.puntosHM ?? [],
    puntosRT: overrides.puntosRT ?? [],
    obsHM: overrides.obsHM ?? [],
    hallazgos: overrides.hallazgos ?? [],
    seq: overrides.seq ?? 0,
  };
}

async function uniqueVisitaId(base: string): Promise<string> {
  let id = base;
  let n = 1;
  while (await VisitaModel.exists({ id })) {
    n += 1;
    id = `${base}-${n}`;
  }
  return id;
}

function resDe(visita: Visita, scope: string, itemId: string): Partial<ItemResultado> {
  if (scope === 'T') return visita.transv[itemId] || {};
  return visita.areasRes[scope]?.[itemId] || {};
}

function setResultado(visita: Visita, scope: string, itemId: string, patch: Partial<ItemResultado>): Visita {
  const merge = (prev: ItemResultado | undefined): ItemResultado | undefined => {
    const next = { ...(prev || {}), ...patch };
    if (!next.r) return undefined;
    return { r: next.r, obs: next.obs || '' };
  };
  if (scope === 'T') {
    const transv = { ...visita.transv };
    const next = merge(transv[itemId]);
    if (next) transv[itemId] = next;
    else delete transv[itemId];
    return { ...visita, transv };
  }
  const areaMap = { ...(visita.areasRes[scope] || {}) };
  const next = merge(areaMap[itemId]);
  if (next) areaMap[itemId] = next;
  else delete areaMap[itemId];
  return { ...visita, areasRes: { ...visita.areasRes, [scope]: areaMap } };
}

function slotsVacios(n: number): TickValor[] {
  return Array.from({ length: n }, () => null);
}

function nextTick(actual: TickValor): TickValor {
  if (actual == null) return true;
  if (actual === true) return false;
  if (actual === false) return 'NA';
  return null;
}

async function requireVisita(id: string): Promise<{ doc: InstanceType<typeof VisitaModel>; visita: Visita }> {
  const doc = await VisitaModel.findOne({ id, ...ownerQuery() });
  if (!doc) throw notFound('Visita', id);
  return { doc, visita: visitaToDto(doc) };
}

function saveVisita(doc: InstanceType<typeof VisitaModel>, visita: Visita) {
  const { createdAt, updatedAt, ...rest } = visita;
  void createdAt;
  void updatedAt;
  doc.set(rest);
  return doc.save();
}

function resumenConteo(visita: Visita) {
  let C = 0;
  let NC = 0;
  let NA = 0;
  const add = (map: Record<string, ItemResultado> | undefined) => {
    Object.values(map || {}).forEach((v) => {
      if (v.r === 'C') C += 1;
      else if (v.r === 'NC') NC += 1;
      else if (v.r === 'NA') NA += 1;
    });
  };
  add(visita.transv);
  Object.values(visita.areasRes || {}).forEach(add);
  return { C, NC, NA, den: C + NC, pct: C + NC ? C / (C + NC) : null };
}

export async function listVisitas(modalidad?: ModalidadVisita, ownerId?: string) {
  const filter: Record<string, unknown> = { ...ownerQuery() };
  if (modalidad) filter.modalidad = modalidad;
  if (ownerId) {
    ownerIdForCreate(ownerId);
    filter.userId = ownerId;
  }
  const docs = await VisitaModel.find(filter).sort({ fecha: -1, id: -1 });
  return docs.map((d) => {
    const v = visitaToDto(d);
    const c = resumenConteo(v);
    return {
      id: v.id,
      modalidad: v.modalidad,
      userId: v.userId,
      sede: v.sede,
      municipio: v.municipio,
      fecha: v.fecha,
      auditor: v.auditor,
      areas: v.areas,
      bloques: v.bloques,
      hallazgos: v.hallazgos.length,
      seq: v.seq,
      C: c.C,
      NC: c.NC,
      pct: c.pct,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    };
  });
}

export async function getVisita(id: string) {
  const { visita } = await requireVisita(id);
  return visita;
}

export async function crearVisita(input: {
  modalidad: ModalidadVisita;
  sede?: string;
  municipio?: string;
  fecha?: string;
  auditor?: string;
  acompanantes?: string;
  alcance?: string;
  areas?: string[];
  bloques?: string[];
  userId?: string;
}) {
  if (input.modalidad !== 'ambulatoria' && input.modalidad !== 'principal') {
    throw badRequest('modalidad debe ser ambulatoria o principal');
  }
  const userId = ownerIdForCreate(input.userId);
  const base = visitaNueva(input.modalidad, { ...input, userId });
  base.id = await uniqueVisitaId(`V-${(base.fecha || hoy()).replace(/-/g, '')}`);
  const created = await VisitaModel.create(base);
  return visitaToDto(created);
}

export async function getOrCreateActiva(modalidad: ModalidadVisita, ownerId?: string) {
  const userId = ownerIdForCreate(ownerId);
  const existing = await VisitaModel.findOne({ modalidad, userId, ...ownerQuery() }).sort({
    updatedAt: -1,
    fecha: -1,
  });
  if (existing) return visitaToDto(existing);
  return crearVisita({ modalidad, userId });
}

export async function patchVisita(
  id: string,
  patch: Partial<Pick<Visita, 'sede' | 'municipio' | 'fecha' | 'auditor' | 'acompanantes' | 'alcance' | 'concl'>>,
) {
  const { doc } = await requireVisita(id);
  doc.set(patch);
  await doc.save();
  return visitaToDto(doc);
}

export async function borrarVisita(id: string) {
  const doc = await VisitaModel.findOneAndDelete({ id, ...ownerQuery() });
  if (!doc) throw notFound('Visita', id);
  return { deleted: id };
}

export async function reiniciarVisita(id: string) {
  const { doc, visita } = await requireVisita(id);
  const next = visitaNueva(visita.modalidad, { id: visita.id, modalidad: visita.modalidad, userId: visita.userId });
  await saveVisita(doc, next);
  return visitaToDto(doc);
}

export async function toggleArea(id: string, codigo: string) {
  const { doc, visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  if (!catalog.bloquesServicio.some((b) => b.codigo === codigo)) {
    throw badRequest(`Área no válida: ${codigo}`);
  }
  let areas: string[];
  if (visita.areas.includes(codigo)) {
    areas = visita.areas.filter((x) => x !== codigo);
  } else {
    const order = catalog.bloquesServicio.map((b) => b.codigo);
    areas = [...visita.areas, codigo].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
  visita.areas = areas;
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function toggleBloque(id: string, codigo: string) {
  const { doc, visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  if (!catalog.meta.allowToggleBloques) {
    throw badRequest('Esta modalidad no permite desmarcar bloques transversales');
  }
  if (!catalog.codigosTransversales.has(codigo)) {
    throw badRequest(`Bloque no válido: ${codigo}`);
  }
  let bloques: string[];
  if (visita.bloques.includes(codigo)) {
    bloques = visita.bloques.filter((x) => x !== codigo);
  } else {
    const order = catalog.bloquesTransversales.map((b) => b.codigo);
    bloques = [...visita.bloques, codigo].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
  visita.bloques = bloques;
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function marcarItem(id: string, scope: string, itemId: string, estado: ResultadoEstado) {
  const { doc, visita } = await requireVisita(id);
  itemPorId(catalogOf(visita.modalidad), itemId);
  const actual = resDe(visita, scope, itemId).r;
  const next = setResultado(
    visita,
    scope,
    itemId,
    { r: actual === estado ? (undefined as unknown as ResultadoEstado) : estado },
  );
  await saveVisita(doc, next);
  return visitaToDto(doc);
}

export async function setObsItem(id: string, scope: string, itemId: string, obs: string) {
  const { doc, visita } = await requireVisita(id);
  const next = setResultado(visita, scope, itemId, { obs });
  await saveVisita(doc, next);
  return visitaToDto(doc);
}

function buildHallazgo(visita: Visita, scope: string, itemId: string): { visita: Visita; hallazgo: HallazgoAmb } {
  const catalog = catalogOf(visita.modalidad);
  const item = itemPorId(catalog, itemId);
  const { seq, id } = nextPrefixedId(visita.seq, 'H');
  const propuesta = item.prop;
  const area = scope === 'T' ? 'Toda la sede' : catalog.nombreBloque[scope] || scope;
  const hallazgo: HallazgoAmb = {
    id,
    scope,
    itemId,
    area,
    bloque: item.bloque,
    desc: resDe(visita, scope, itemId).obs || '',
    criticidad: propuesta?.criticidad ?? 'Media',
    que: propuesta?.que ?? '',
    porque: propuesta?.porque ?? '',
    donde: area,
    quien: propuesta?.quien ?? '',
    cuando: propuesta ? sumarDias(visita.fecha, propuesta.plazo) : '',
    como: propuesta?.como ?? '',
    estado: 'Abierto',
    fechaCierre: '',
    evidencia: '',
    sugerido: Boolean(propuesta),
  };
  return { visita: { ...visita, seq, hallazgos: [...visita.hallazgos, hallazgo] }, hallazgo };
}

export async function crearPlan(id: string, scope: string, itemId: string) {
  const { doc, visita } = await requireVisita(id);
  const existente = visita.hallazgos.find((h) => h.itemId === itemId && h.scope === scope);
  if (existente) return { visita, hallazgo: existente };
  const created = buildHallazgo(visita, scope, itemId);
  await saveVisita(doc, created.visita);
  return { visita: visitaToDto(doc), hallazgo: created.hallazgo };
}

export async function generarPendientes(id: string) {
  const { doc, visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  let current = visita;
  let n = 0;
  const falta = (scope: string, itemId: string) =>
    resDe(current, scope, itemId).r === 'NC' &&
    !current.hallazgos.some((h) => h.itemId === itemId && h.scope === scope);

  itemsTransversales(catalog, current.bloques).forEach((item) => {
    if (!falta('T', item.id)) return;
    current = buildHallazgo(current, 'T', item.id).visita;
    n += 1;
  });
  current.areas.forEach((area) => {
    itemsDeArea(catalog, area).forEach((item) => {
      if (!falta(area, item.id)) return;
      current = buildHallazgo(current, area, item.id).visita;
      n += 1;
    });
  });
  await saveVisita(doc, current);
  return { creados: n, visita: visitaToDto(doc) };
}

export async function patchPlan(id: string, planId: string, patch: Partial<HallazgoAmb>) {
  const { doc, visita } = await requireVisita(id);
  const idx = visita.hallazgos.findIndex((h) => h.id === planId);
  if (idx < 0) throw notFound('Plan', planId);
  const current = visita.hallazgos[idx];
  const next = { ...current, ...patch, id: current.id, scope: current.scope, itemId: current.itemId, bloque: current.bloque };
  if (patch.estado === 'Cerrado' && !next.fechaCierre) next.fechaCierre = hoy();
  visita.hallazgos[idx] = next;
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function validarPlan(id: string, planId: string) {
  return patchPlan(id, planId, { sugerido: false });
}

export async function borrarPlan(id: string, planId: string) {
  const { doc, visita } = await requireVisita(id);
  const before = visita.hallazgos.length;
  visita.hallazgos = visita.hallazgos.filter((h) => h.id !== planId);
  if (visita.hallazgos.length === before) throw notFound('Plan', planId);
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function addObsHM(id: string, cargo: string, momento: string, accion: AccionHigiene) {
  const { doc, visita } = await requireVisita(id);
  visita.obsHM = [
    ...visita.obsHM,
    { id: `O${Date.now()}${Math.random().toString(36).slice(2, 6)}`, cargo, momento, accion },
  ];
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function delObsHM(id: string, obsId: string) {
  const { doc, visita } = await requireVisita(id);
  visita.obsHM = visita.obsHM.filter((o) => o.id !== obsId);
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function addPunto(id: string, tipo: 'HM' | 'RT') {
  const { doc, visita } = await requireVisita(id);
  const punto = { n: '', c: slotsVacios(tipo === 'HM' ? 7 : 5) };
  if (tipo === 'HM') visita.puntosHM = [...visita.puntosHM, punto];
  else visita.puntosRT = [...visita.puntosRT, punto];
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function delPunto(id: string, tipo: 'HM' | 'RT', index: number) {
  const { doc, visita } = await requireVisita(id);
  const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
  if (index < 0 || index >= visita[key].length) throw badRequest('Índice de punto inválido');
  visita[key] = visita[key].filter((_, i) => i !== index);
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function setPuntoNombre(id: string, tipo: 'HM' | 'RT', index: number, nombre: string) {
  const { doc, visita } = await requireVisita(id);
  const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
  if (index < 0 || index >= visita[key].length) throw badRequest('Índice de punto inválido');
  visita[key] = visita[key].map((p, i) => (i === index ? { ...p, n: nombre } : p));
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function tickPunto(id: string, tipo: 'HM' | 'RT', index: number, col: number) {
  const { doc, visita } = await requireVisita(id);
  const key = tipo === 'HM' ? 'puntosHM' : 'puntosRT';
  if (index < 0 || index >= visita[key].length) throw badRequest('Índice de punto inválido');
  visita[key] = visita[key].map((p, i) => {
    if (i !== index) return p;
    const c = [...p.c] as TickValor[];
    c[col] = nextTick(c[col] ?? null);
    return { ...p, c };
  });
  await saveVisita(doc, visita);
  return visitaToDto(doc);
}

export async function replaceVisita(id: string, payload: Partial<Visita> & { id?: string }) {
  const { doc, visita } = await requireVisita(id);
  const next = visitaNueva(visita.modalidad, { ...visita, ...payload, id: visita.id, modalidad: visita.modalidad });
  await saveVisita(doc, next);
  return visitaToDto(doc);
}

function cuenta(obj: Record<string, ItemResultado> | undefined, ids: string[]) {
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

function puntosResumen(lista: Visita['puntosHM'], chk: string[]) {
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
  return { total: lista.length, eval: evaluados, conf, pct: evaluados ? conf / evaluados : null, fallas };
}

function adherencia(obs: Visita['obsHM'], filtro?: (o: Visita['obsHM'][number]) => boolean) {
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

export async function resumenVisita(id: string) {
  const { visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  const transvItems = itemsTransversales(catalog, visita.bloques);
  const t = cuenta(visita.transv, transvItems.map((i) => i.id));
  let C = t.C;
  let NC = t.NC;
  let NA = t.NA;
  visita.areas.forEach((area) => {
    const k = cuenta(visita.areasRes[area] || {}, itemsDeArea(catalog, area).map((i) => i.id));
    C += k.C;
    NC += k.NC;
    NA += k.NA;
  });
  const chkHM = catalog.meta.chkHM || [];
  const chkRT = catalog.meta.chkRT || [];
  return {
    visita: { id: visita.id, modalidad: visita.modalidad, sede: visita.sede, fecha: visita.fecha },
    global: { C, NC, NA, den: C + NC, pct: C + NC ? C / (C + NC) : null },
    transv: t,
    puntosHM: puntosResumen(visita.puntosHM, chkHM),
    puntosRT: puntosResumen(visita.puntosRT, chkRT),
    adherencia: adherencia(visita.obsHM),
    planes: visita.hallazgos.length,
    sinValidar: visita.hallazgos.filter((h) => h.sugerido && h.estado !== 'Cerrado').length,
  };
}

export async function csvDetalleVisita(id: string) {
  const { visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  const filas: unknown[][] = [[
    'Sede', 'Fecha', 'Ámbito', 'Bloque', 'Nombre del bloque', 'ID ítem',
    'Ítem', 'Resultado', 'Observación', 'Fuente de verificación', 'Referencia',
  ]];
  const add = (scope: string, item: { id: string; bloque: string; bloque_nombre: string; item: string; fuente: string; referencia: string }) => {
    const v = resDe(visita, scope, item.id);
    if (!v.r) return;
    filas.push([
      visita.sede, visita.fecha,
      scope === 'T' ? 'Toda la sede' : catalog.nombreBloque[scope] || scope,
      item.bloque, item.bloque_nombre, item.id, item.item, v.r, v.obs || '', item.fuente, item.referencia,
    ]);
  };
  itemsTransversales(catalog, visita.bloques).forEach((item) => add('T', item));
  visita.areas.forEach((area) => itemsDeArea(catalog, area).forEach((item) => add(area, item)));
  return toCsv(filas);
}

export async function csvPlanesVisita(id: string) {
  const { visita } = await requireVisita(id);
  const catalog = catalogOf(visita.modalidad);
  const filas: unknown[][] = [[
    'ID', 'Sede', 'Fecha', 'Área', 'ID ítem', 'Ítem', 'Hallazgo', 'Criticidad',
    'QUÉ', 'POR QUÉ', 'DÓNDE', 'QUIÉN', 'CUÁNDO', 'CÓMO', 'Estado', 'Origen del texto',
  ]];
  visita.hallazgos.forEach((h) => {
    const item = catalog.itemById.get(h.itemId);
    filas.push([
      h.id, visita.sede, visita.fecha, h.area, h.itemId, item?.item || '', h.desc, h.criticidad,
      h.que, h.porque, h.donde, h.quien, h.cuando, h.como, h.estado,
      h.sugerido ? 'Propuesta sin validar' : 'Validado por el auditor',
    ]);
  });
  return toCsv(filas);
}
