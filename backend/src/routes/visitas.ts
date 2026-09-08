import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ok, sendCsv, sendJsonFile, validate } from '../http.js';
import * as visitas from '../services/visitas.js';
import { badRequest } from '../types.js';

export const visitasRouter = Router();

function requirePuntoTipo(tipo: string): 'HM' | 'RT' {
  if (tipo !== 'HM' && tipo !== 'RT') throw badRequest('tipo debe ser HM o RT');
  return tipo;
}

const crearSchema = z.object({
  modalidad: z.enum(['ambulatoria', 'principal']),
  sede: z.string().optional(),
  municipio: z.string().optional(),
  fecha: z.string().optional(),
  auditor: z.string().optional(),
  acompanantes: z.string().optional(),
  alcance: z.string().optional(),
  areas: z.array(z.string()).optional(),
  bloques: z.array(z.string()).optional(),
  userId: z.string().optional(),
});

const patchSchema = z.object({
  sede: z.string().optional(),
  municipio: z.string().optional(),
  fecha: z.string().optional(),
  auditor: z.string().optional(),
  acompanantes: z.string().optional(),
  alcance: z.string().optional(),
  concl: z.string().optional(),
});

const marcarSchema = z.object({
  scope: z.string().min(1),
  itemId: z.string().min(1),
  r: z.enum(['C', 'NC', 'NA']),
});

const obsSchema = z.object({
  scope: z.string().min(1),
  itemId: z.string().min(1),
  obs: z.string(),
});

const planSchema = z.object({
  scope: z.string().min(1),
  itemId: z.string().min(1),
});

const planPatchSchema = z.object({
  desc: z.string().optional(),
  criticidad: z.enum(['Alta', 'Media', 'Baja']).optional(),
  que: z.string().optional(),
  porque: z.string().optional(),
  donde: z.string().optional(),
  quien: z.string().optional(),
  cuando: z.string().optional(),
  como: z.string().optional(),
  estado: z.enum(['Abierto', 'En ejecución', 'Cerrado']).optional(),
  fechaCierre: z.string().optional(),
  evidencia: z.string().optional(),
  area: z.string().optional(),
});

visitasRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const modalidad = req.query.modalidad;
    const ownerId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
    ok(
      res,
      await visitas.listVisitas(
        modalidad === 'ambulatoria' || modalidad === 'principal' ? modalidad : undefined,
        ownerId,
      ),
    );
  }),
);

visitasRouter.get(
  '/activa',
  asyncHandler(async (req, res) => {
    const modalidad = req.query.modalidad;
    if (modalidad !== 'ambulatoria' && modalidad !== 'principal') {
      throw badRequest('Indique modalidad=ambulatoria o principal');
    }
    const ownerId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
    ok(res, await visitas.getOrCreateActiva(modalidad, ownerId));
  }),
);

visitasRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = validate(crearSchema, req.body);
    ok(res, await visitas.crearVisita(body), 201);
  }),
);

visitasRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.getVisita(req.params.id));
  }),
);

visitasRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const body = validate(patchSchema, req.body);
    ok(res, await visitas.patchVisita(req.params.id, body));
  }),
);

visitasRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.borrarVisita(req.params.id));
  }),
);

visitasRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.replaceVisita(req.params.id, req.body));
  }),
);

visitasRouter.post(
  '/:id/reiniciar',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.reiniciarVisita(req.params.id));
  }),
);

visitasRouter.post(
  '/:id/areas/:codigo/toggle',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.toggleArea(req.params.id, req.params.codigo));
  }),
);

visitasRouter.post(
  '/:id/bloques/:codigo/toggle',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.toggleBloque(req.params.id, req.params.codigo));
  }),
);

visitasRouter.put(
  '/:id/resultados',
  asyncHandler(async (req, res) => {
    const body = validate(marcarSchema, req.body);
    ok(res, await visitas.marcarItem(req.params.id, body.scope, body.itemId, body.r));
  }),
);

visitasRouter.patch(
  '/:id/resultados/obs',
  asyncHandler(async (req, res) => {
    const body = validate(obsSchema, req.body);
    ok(res, await visitas.setObsItem(req.params.id, body.scope, body.itemId, body.obs));
  }),
);

visitasRouter.post(
  '/:id/planes',
  asyncHandler(async (req, res) => {
    const body = validate(planSchema, req.body);
    ok(res, await visitas.crearPlan(req.params.id, body.scope, body.itemId), 201);
  }),
);

visitasRouter.post(
  '/:id/planes/generar-pendientes',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.generarPendientes(req.params.id));
  }),
);

visitasRouter.patch(
  '/:id/planes/:planId',
  asyncHandler(async (req, res) => {
    const body = validate(planPatchSchema, req.body);
    ok(res, await visitas.patchPlan(req.params.id, req.params.planId, body));
  }),
);

visitasRouter.post(
  '/:id/planes/:planId/validar',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.validarPlan(req.params.id, req.params.planId));
  }),
);

visitasRouter.delete(
  '/:id/planes/:planId',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.borrarPlan(req.params.id, req.params.planId));
  }),
);

visitasRouter.post(
  '/:id/obs-hm',
  asyncHandler(async (req, res) => {
    const body = validate(
      z.object({
        cargo: z.string().min(1),
        momento: z.string().min(1),
        accion: z.enum(['FR', 'LM', 'OM']),
      }),
      req.body,
    );
    ok(res, await visitas.addObsHM(req.params.id, body.cargo, body.momento, body.accion));
  }),
);

visitasRouter.delete(
  '/:id/obs-hm/:obsId',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.delObsHM(req.params.id, req.params.obsId));
  }),
);

visitasRouter.post(
  '/:id/puntos/:tipo',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.addPunto(req.params.id, requirePuntoTipo(req.params.tipo)));
  }),
);

visitasRouter.delete(
  '/:id/puntos/:tipo/:index',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.delPunto(req.params.id, requirePuntoTipo(req.params.tipo), Number(req.params.index)));
  }),
);

visitasRouter.patch(
  '/:id/puntos/:tipo/:index',
  asyncHandler(async (req, res) => {
    const body = validate(z.object({ n: z.string() }), req.body);
    ok(res, await visitas.setPuntoNombre(req.params.id, requirePuntoTipo(req.params.tipo), Number(req.params.index), body.n));
  }),
);

visitasRouter.post(
  '/:id/puntos/:tipo/:index/tick',
  asyncHandler(async (req, res) => {
    const body = validate(z.object({ col: z.number().int().nonnegative() }), req.body);
    ok(res, await visitas.tickPunto(req.params.id, requirePuntoTipo(req.params.tipo), Number(req.params.index), body.col));
  }),
);

visitasRouter.get(
  '/:id/resumen',
  asyncHandler(async (req, res) => {
    ok(res, await visitas.resumenVisita(req.params.id));
  }),
);

visitasRouter.get(
  '/:id/export/json',
  asyncHandler(async (req, res) => {
    const visita = await visitas.getVisita(req.params.id);
    sendJsonFile(res, `respaldo_visita_${visita.fecha}.json`, visita);
  }),
);

visitasRouter.get(
  '/:id/export/csv/detalle',
  asyncHandler(async (req, res) => {
    sendCsv(res, 'ronda_sede_detalle.csv', await visitas.csvDetalleVisita(req.params.id));
  }),
);

visitasRouter.get(
  '/:id/export/csv/planes',
  asyncHandler(async (req, res) => {
    sendCsv(res, 'ronda_sede_planes.csv', await visitas.csvPlanesVisita(req.params.id));
  }),
);
