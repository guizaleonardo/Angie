import { ownerIdForCreate, ownerQuery, requireAdmin } from '../auth/access.js';
import { getCatalog, itemPorId, itemsDeServicio } from '../catalog/index.js';
import { conteoConCatalogo, nivel, semaforoHallazgo } from '../calculations.js';
import { HallazgoModel, hallazgoToDto } from '../models/Hallazgo.js';
import { getSeq, nextSeq, setSeq } from '../models/Counter.js';
import { RondaModel, rondaToDto } from '../models/Ronda.js';
import { badRequest, notFound, type Hallazgo, type ResultadoEstado, type Ronda } from '../types.js';
import { hoy, nextPrefixedId, sumarDias } from '../utils.js';

const SEQ = 'hospitalaria';

async function allRondas(): Promise<Ronda[]> {
  const docs = await RondaModel.find(ownerQuery()).sort({ fecha: -1, id: -1 });
  return docs.map(rondaToDto);
}

async function allHallazgos(): Promise<Hallazgo[]> {
  const docs = await HallazgoModel.find(ownerQuery()).sort({ id: 1 });
  return docs.map(hallazgoToDto);
}

async function findRonda(id: string) {
  const doc = await RondaModel.findOne({ id, ...ownerQuery() });
  if (!doc) throw notFound('Ronda', id);
  return doc;
}

async function findHallazgo(id: string) {
  const doc = await HallazgoModel.findOne({ id, ...ownerQuery() });
  if (!doc) throw notFound('Hallazgo', id);
  return doc;
}

export async function listRondas() {
  const catalog = getCatalog('hospitalaria');
  const rondas = await allRondas();
  return rondas.map((ronda) => ({
    ...ronda,
    conteo: conteoConCatalogo(ronda, catalog),
    nivel: nivel(conteoConCatalogo(ronda, catalog).pct),
  }));
}

export async function getRonda(id: string) {
  const catalog = getCatalog('hospitalaria');
  const doc = await findRonda(id);
  const ronda = rondaToDto(doc);
  const hallazgos = (await HallazgoModel.find({ rondaId: id, ...ownerQuery() })).map(hallazgoToDto);
  const items = itemsDeServicio(catalog, ronda.servicioCod);
  return {
    ...ronda,
    items,
    conteo: conteoConCatalogo(ronda, catalog),
    nivel: nivel(conteoConCatalogo(ronda, catalog).pct),
    hallazgos,
    itemsConHallazgo: hallazgos.map((h) => h.itemId),
  };
}

export async function crearRonda(input: {
  servicioCod: string;
  fecha?: string;
  lider?: string;
  acompanantes?: string;
}) {
  const catalog = getCatalog('hospitalaria');
  const servicio = catalog.nombreBloque[input.servicioCod];
  if (!servicio || !catalog.bloquesServicio.some((b) => b.codigo === input.servicioCod)) {
    throw badRequest(`Servicio no válido: ${input.servicioCod}`);
  }
  const seq = await nextSeq(SEQ);
  const { id } = nextPrefixedId(seq - 1, 'R');
  const created = await RondaModel.create({
    id,
    servicioCod: input.servicioCod,
    servicio,
    fecha: input.fecha || hoy(),
    lider: (input.lider || '').trim(),
    acompanantes: (input.acompanantes || '').trim(),
    obs: '',
    resultados: {},
    userId: ownerIdForCreate(),
  });
  return rondaToDto(created);
}

export async function updateRonda(
  id: string,
  patch: Partial<Pick<Ronda, 'fecha' | 'lider' | 'acompanantes' | 'obs'>>,
) {
  const doc = await RondaModel.findOneAndUpdate({ id, ...ownerQuery() }, { $set: patch }, { new: true });
  if (!doc) throw notFound('Ronda', id);
  return rondaToDto(doc);
}

export async function borrarRonda(id: string) {
  const doc = await RondaModel.findOneAndDelete({ id, ...ownerQuery() });
  if (!doc) throw notFound('Ronda', id);
  await HallazgoModel.deleteMany({ rondaId: id });
  return { deleted: id };
}

export async function marcarItem(rondaId: string, itemId: string, estado: ResultadoEstado) {
  const catalog = getCatalog('hospitalaria');
  itemPorId(catalog, itemId);
  const doc = await findRonda(rondaId);
  const ronda = rondaToDto(doc);
  const actual = ronda.resultados[itemId];
  const resultados = { ...ronda.resultados };
  if (actual?.r === estado) delete resultados[itemId];
  else resultados[itemId] = { r: estado, obs: actual?.obs || '' };
  doc.set('resultados', resultados);
  await doc.save();
  return rondaToDto(doc);
}

export async function setObservacionItem(rondaId: string, itemId: string, obs: string) {
  const doc = await findRonda(rondaId);
  const ronda = rondaToDto(doc);
  const actual = ronda.resultados[itemId];
  if (!actual) throw badRequest('El ítem no tiene resultado; márquelo antes de observar');
  const resultados = { ...ronda.resultados, [itemId]: { ...actual, obs } };
  doc.set('resultados', resultados);
  await doc.save();
  return rondaToDto(doc);
}

export async function marcarTodo(rondaId: string, estado: ResultadoEstado) {
  const catalog = getCatalog('hospitalaria');
  const doc = await findRonda(rondaId);
  const ronda = rondaToDto(doc);
  const resultados = { ...ronda.resultados };
  itemsDeServicio(catalog, ronda.servicioCod).forEach((item) => {
    if (!resultados[item.id]) resultados[item.id] = { r: estado, obs: '' };
  });
  doc.set('resultados', resultados);
  await doc.save();
  return rondaToDto(doc);
}

export async function limpiarResultados(rondaId: string) {
  const doc = await RondaModel.findOneAndUpdate({ id: rondaId, ...ownerQuery() }, { $set: { resultados: {} } }, { new: true });
  if (!doc) throw notFound('Ronda', rondaId);
  return rondaToDto(doc);
}

function nuevoHallazgo(seq: number, ronda: Ronda, itemId: string): { seq: number; hallazgo: Hallazgo } {
  const catalog = getCatalog('hospitalaria');
  const item = itemPorId(catalog, itemId);
  const next = nextPrefixedId(seq, 'H');
  const propuesta = item.prop;
  return {
    seq: next.seq,
    hallazgo: {
      id: next.id,
      rondaId: ronda.id,
      itemId,
      servicioCod: ronda.servicioCod,
      servicio: ronda.servicio,
      bloque: item.bloque,
      fecha: ronda.fecha,
      desc: ronda.resultados[itemId]?.obs || '',
      criticidad: propuesta?.criticidad ?? 'Media',
      que: propuesta?.que ?? '',
      porque: propuesta?.porque ?? '',
      donde: ronda.servicio,
      quien: propuesta?.quien ?? '',
      cuando: propuesta ? sumarDias(ronda.fecha, propuesta.plazo) : '',
      como: propuesta?.como ?? '',
      estado: 'Abierto',
      fechaCierre: '',
      evidencia: '',
      sugerido: Boolean(propuesta),
      userId: ronda.userId,
    },
  };
}

export async function listHallazgos(query: { filtro?: string; rondaId?: string }) {
  const filter: Record<string, unknown> = { ...ownerQuery() };
  if (query.rondaId) filter.rondaId = query.rondaId;
  const hallazgos = (await HallazgoModel.find(filter).sort({ id: 1 })).map(hallazgoToDto);
  const fechaHoy = hoy();
  if (query.filtro === 'abiertos') return hallazgos.filter((h) => h.estado !== 'Cerrado');
  if (query.filtro === 'vencidos') {
    return hallazgos.filter((h) => h.estado !== 'Cerrado' && Boolean(h.cuando) && h.cuando < fechaHoy);
  }
  return hallazgos;
}

export async function crearHallazgo(rondaId: string, itemId: string) {
  const rondaDoc = await findRonda(rondaId);
  const existente = await HallazgoModel.findOne({ rondaId, itemId, ...ownerQuery() });
  if (existente) return hallazgoToDto(existente);
  const seq = await nextSeq(SEQ);
  const built = nuevoHallazgo(seq - 1, rondaToDto(rondaDoc), itemId);
  const created = await HallazgoModel.create(built.hallazgo);
  return hallazgoToDto(created);
}

export async function generarPendientes() {
  const rondas = await allRondas();
  const hallazgos = await allHallazgos();
  const existentes = new Set(hallazgos.map((h) => `${h.rondaId}:${h.itemId}`));
  const creados: Hallazgo[] = [];
  for (const ronda of rondas) {
    for (const [itemId, valor] of Object.entries(ronda.resultados || {})) {
      if (valor.r !== 'NC') continue;
      if (existentes.has(`${ronda.id}:${itemId}`)) continue;
      const seq = await nextSeq(SEQ);
      const built = nuevoHallazgo(seq - 1, ronda, itemId);
      const created = await HallazgoModel.create(built.hallazgo);
      existentes.add(`${ronda.id}:${itemId}`);
      creados.push(hallazgoToDto(created));
    }
  }
  return { creados: creados.length, hallazgos: creados };
}

export async function patchHallazgo(id: string, patch: Partial<Hallazgo>) {
  const allowed: Array<keyof Hallazgo> = [
    'desc', 'criticidad', 'que', 'porque', 'donde', 'quien', 'cuando', 'como',
    'estado', 'fechaCierre', 'evidencia',
  ];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (patch[key] !== undefined) update[key] = patch[key];
  }
  if (update.estado === 'Cerrado' && !update.fechaCierre) {
    const current = await findHallazgo(id);
    if (!current.fechaCierre) update.fechaCierre = hoy();
  }
  const doc = await HallazgoModel.findOneAndUpdate({ id, ...ownerQuery() }, { $set: update }, { new: true });
  if (!doc) throw notFound('Hallazgo', id);
  return hallazgoToDto(doc);
}

export async function validarHallazgo(id: string) {
  const doc = await HallazgoModel.findOneAndUpdate({ id, ...ownerQuery() }, { $set: { sugerido: false } }, { new: true });
  if (!doc) throw notFound('Hallazgo', id);
  return hallazgoToDto(doc);
}

export async function restaurarPropuesta(id: string) {
  const doc = await findHallazgo(id);
  const catalog = getCatalog('hospitalaria');
  const item = itemPorId(catalog, doc.itemId);
  if (!item.prop) throw badRequest('Este ítem no tiene propuesta en la biblioteca');
  const propuesta = item.prop;
  doc.set({
    criticidad: propuesta.criticidad,
    que: propuesta.que,
    porque: propuesta.porque,
    quien: propuesta.quien,
    como: propuesta.como,
    cuando: sumarDias(doc.fecha, propuesta.plazo),
    sugerido: true,
  });
  await doc.save();
  return hallazgoToDto(doc);
}

export async function borrarHallazgo(id: string) {
  const doc = await HallazgoModel.findOneAndDelete({ id, ...ownerQuery() });
  if (!doc) throw notFound('Hallazgo', id);
  return { deleted: id };
}

export async function dumpHospitalaria() {
  const [rondas, hallazgos, seq] = await Promise.all([allRondas(), allHallazgos(), getSeq(SEQ)]);
  return { version: 1, rondas, hallazgos, seq };
}

export async function restoreHospitalaria(raw: { rondas?: unknown; hallazgos?: unknown; seq?: number }) {
  requireAdmin();
  if (!Array.isArray(raw.rondas)) throw badRequest('Respaldo inválido: falta rondas[]');
  const owner = ownerIdForCreate();
  const rondas = raw.rondas.map((item) => sanitizeRonda(item, owner)).filter((r): r is Ronda => r !== null);
  const hallazgos = Array.isArray(raw.hallazgos)
    ? raw.hallazgos.map((item) => sanitizeHallazgo(item, owner)).filter((h): h is Hallazgo => h !== null)
    : [];
  await RondaModel.deleteMany({});
  await HallazgoModel.deleteMany({});
  if (rondas.length) await RondaModel.insertMany(rondas);
  if (hallazgos.length) await HallazgoModel.insertMany(hallazgos);
  await setSeq(SEQ, Number.isFinite(Number(raw.seq)) ? Number(raw.seq) : 0);
  return dumpHospitalaria();
}

function sanitizeRonda(raw: unknown, fallbackUser: string): Ronda | null {
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
    userId: String(source.userId || fallbackUser),
  };
}

function sanitizeHallazgo(raw: unknown, fallbackUser: string): Hallazgo | null {
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
    userId: String(source.userId || fallbackUser),
  };
}

export async function borrarHospitalaria() {
  const q = ownerQuery();
  await RondaModel.deleteMany(q);
  await HallazgoModel.deleteMany(q);
  if (Object.keys(q).length === 0) await setSeq(SEQ, 0);
  return dumpHospitalaria();
}

export async function csvRondas() {
  const catalog = getCatalog('hospitalaria');
  const rondas = await allRondas();
  const filas: unknown[][] = [[
    'ID ronda', 'Fecha', 'Periodo', 'Servicio', 'Líder', 'Acompañantes',
    'Cumple', 'No cumple', 'No aplica', 'Evaluados', '% cumplimiento', 'Nivel', 'Observación general',
  ]];
  rondas.forEach((ronda) => {
    const c = conteoConCatalogo(ronda, catalog);
    filas.push([
      ronda.id, ronda.fecha, ronda.fecha.slice(0, 7), ronda.servicio, ronda.lider, ronda.acompanantes,
      c.C, c.NC, c.NA, c.den, c.pct == null ? '' : (c.pct * 100).toFixed(1).replace('.', ','),
      nivel(c.pct).t, ronda.obs,
    ]);
  });
  return filas;
}

export async function csvDetalle() {
  const catalog = getCatalog('hospitalaria');
  const rondas = await allRondas();
  const filas: unknown[][] = [[
    'ID ronda', 'Fecha', 'Servicio', 'Bloque', 'Nombre del bloque', 'ID ítem',
    'Ítem verificable', 'Resultado', 'Observación', 'Fuente de verificación', 'Referencia normativa',
  ]];
  rondas.forEach((ronda) => {
    itemsDeServicio(catalog, ronda.servicioCod).forEach((item) => {
      const valor = ronda.resultados[item.id];
      if (!valor?.r) return;
      filas.push([
        ronda.id, ronda.fecha, ronda.servicio, item.bloque, item.bloque_nombre,
        item.id, item.item, valor.r, valor.obs || '', item.fuente, item.referencia,
      ]);
    });
  });
  return filas;
}

export async function csvHallazgos() {
  const catalog = getCatalog('hospitalaria');
  const hallazgos = await allHallazgos();
  const filas: unknown[][] = [[
    'ID plan', 'ID ronda', 'Fecha ronda', 'Servicio', 'ID ítem', 'Ítem', 'Hallazgo', 'Criticidad',
    'QUÉ', 'POR QUÉ', 'DÓNDE', 'QUIÉN', 'CUÁNDO', 'CÓMO', 'Estado', 'Fecha de cierre',
    'Evidencia', 'Semáforo', 'Origen del texto',
  ]];
  hallazgos.forEach((h) => {
    const item = catalog.itemById.get(h.itemId);
    filas.push([
      h.id, h.rondaId, h.fecha, h.servicio, h.itemId, item?.item || '', h.desc, h.criticidad,
      h.que, h.porque, h.donde, h.quien, h.cuando, h.como, h.estado, h.fechaCierre,
      h.evidencia, semaforoHallazgo(h), h.sugerido ? 'Propuesta sin validar' : 'Validado por el auditor',
    ]);
  });
  return filas;
}

export async function dashboardHospitalaria() {
  const catalog = getCatalog('hospitalaria');
  const [rondas, hallazgos] = await Promise.all([allRondas(), allHallazgos()]);
  const global = { C: 0, NC: 0, NA: 0, pct: null as number | null };
  rondas.forEach((ronda) => {
    const k = conteoConCatalogo(ronda, catalog);
    global.C += k.C;
    global.NC += k.NC;
    global.NA += k.NA;
  });
  global.pct = global.C + global.NC ? global.C / (global.C + global.NC) : null;

  const servicios = catalog.bloquesServicio.map((servicio) => {
    const delServicio = rondas.filter((r) => r.servicioCod === servicio.codigo);
    const a = { C: 0, NC: 0, NA: 0, pct: null as number | null };
    delServicio.forEach((ronda) => {
      const k = conteoConCatalogo(ronda, catalog);
      a.C += k.C;
      a.NC += k.NC;
      a.NA += k.NA;
    });
    a.pct = a.C + a.NC ? a.C / (a.C + a.NC) : null;
    return {
      cod: servicio.codigo,
      nom: servicio.nombre,
      rondas: delServicio.filter((r) => conteoConCatalogo(r, catalog).den > 0).length,
      ...a,
      ha: hallazgos.filter((x) => x.servicioCod === servicio.codigo && x.estado !== 'Cerrado').length,
    };
  }).sort((a, b) => Number(a.pct == null) - Number(b.pct == null) || (a.pct ?? 0) - (b.pct ?? 0));

  const porBloque = catalog.bloques.map((bloque) => {
    let C = 0;
    let NC = 0;
    let NA = 0;
    rondas.forEach((ronda) => {
      Object.entries(ronda.resultados || {}).forEach(([id, valor]) => {
        const item = catalog.itemById.get(id);
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
      C, NC, NA,
      pct: C + NC ? C / (C + NC) : null,
    };
  }).filter((b) => b.C + b.NC + b.NA > 0);

  const per: Record<string, { C: number; NC: number; n: number }> = {};
  rondas.forEach((ronda) => {
    const key = ronda.fecha.slice(0, 7);
    if (!key) return;
    const c = conteoConCatalogo(ronda, catalog);
    if (!c.den) return;
    per[key] = per[key] || { C: 0, NC: 0, n: 0 };
    per[key].C += c.C;
    per[key].NC += c.NC;
    per[key].n += 1;
  });
  const tendencia = Object.keys(per).sort().map((k) => ({
    k, v: per[k].C / (per[k].C + per[k].NC), n: per[k].n,
  }));

  const rep: Record<string, number> = {};
  rondas.forEach((ronda) => {
    Object.entries(ronda.resultados || {}).forEach(([id, valor]) => {
      if (valor.r === 'NC') rep[id] = (rep[id] || 0) + 1;
    });
  });
  const repetidas = Object.entries(rep)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([id, veces]) => ({ id, veces, item: catalog.itemById.get(id)?.item || '' }));

  return {
    rondas: rondas.length,
    conResultados: rondas.filter((r) => conteoConCatalogo(r, catalog).den > 0).length,
    global,
    nivel: nivel(global.pct),
    planesAbiertos: hallazgos.filter((h) => h.estado !== 'Cerrado').length,
    vencidos: hallazgos.filter((h) => h.estado !== 'Cerrado' && h.cuando && h.cuando < hoy()).length,
    alta: hallazgos.filter((h) => h.criticidad === 'Alta' && h.estado !== 'Cerrado').length,
    sinValidar: hallazgos.filter((h) => h.sugerido && h.estado !== 'Cerrado').length,
    servicios,
    porBloque,
    tendencia,
    repetidas,
  };
}
