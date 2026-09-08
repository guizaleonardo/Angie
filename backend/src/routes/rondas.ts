import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ok, validate } from '../http.js';
import * as hospitalaria from '../services/hospitalaria.js';

export const rondasRouter = Router();

const crearSchema = z.object({
  servicioCod: z.string().min(1),
  fecha: z.string().optional(),
  lider: z.string().optional(),
  acompanantes: z.string().optional(),
});

const patchSchema = z.object({
  fecha: z.string().optional(),
  lider: z.string().optional(),
  acompanantes: z.string().optional(),
  obs: z.string().optional(),
});

const marcarSchema = z.object({
  r: z.enum(['C', 'NC', 'NA']),
});

rondasRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    ok(res, await hospitalaria.listRondas());
  }),
);

rondasRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = validate(crearSchema, req.body);
    ok(res, await hospitalaria.crearRonda(body), 201);
  }),
);

rondasRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.getRonda(req.params.id));
  }),
);

rondasRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const body = validate(patchSchema, req.body);
    ok(res, await hospitalaria.updateRonda(req.params.id, body));
  }),
);

rondasRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.borrarRonda(req.params.id));
  }),
);

rondasRouter.put(
  '/:id/resultados/:itemId',
  asyncHandler(async (req, res) => {
    const body = validate(marcarSchema, req.body);
    ok(res, await hospitalaria.marcarItem(req.params.id, req.params.itemId, body.r));
  }),
);

rondasRouter.patch(
  '/:id/resultados/:itemId/obs',
  asyncHandler(async (req, res) => {
    const body = validate(z.object({ obs: z.string() }), req.body);
    ok(res, await hospitalaria.setObservacionItem(req.params.id, req.params.itemId, body.obs));
  }),
);

rondasRouter.patch(
  '/:id/obs',
  asyncHandler(async (req, res) => {
    const body = validate(z.object({ obs: z.string() }), req.body);
    ok(res, await hospitalaria.updateRonda(req.params.id, { obs: body.obs }));
  }),
);

rondasRouter.post(
  '/:id/marcar-todo',
  asyncHandler(async (req, res) => {
    const body = validate(z.object({ estado: z.enum(['C', 'NC', 'NA']) }), req.body);
    ok(res, await hospitalaria.marcarTodo(req.params.id, body.estado));
  }),
);

rondasRouter.post(
  '/:id/limpiar-resultados',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.limpiarResultados(req.params.id));
  }),
);
