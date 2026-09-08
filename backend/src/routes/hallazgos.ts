import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ok, validate } from '../http.js';
import * as hospitalaria from '../services/hospitalaria.js';

export const hallazgosRouter = Router();

const crearSchema = z.object({
  rondaId: z.string().min(1),
  itemId: z.string().min(1),
});

const patchSchema = z.object({
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
});

hallazgosRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    ok(
      res,
      await hospitalaria.listHallazgos({
        filtro: typeof req.query.filtro === 'string' ? req.query.filtro : undefined,
        rondaId: typeof req.query.rondaId === 'string' ? req.query.rondaId : undefined,
      }),
    );
  }),
);

hallazgosRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = validate(crearSchema, req.body);
    ok(res, await hospitalaria.crearHallazgo(body.rondaId, body.itemId), 201);
  }),
);

hallazgosRouter.post(
  '/generar-pendientes',
  asyncHandler(async (_req, res) => {
    ok(res, await hospitalaria.generarPendientes());
  }),
);

hallazgosRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const body = validate(patchSchema, req.body);
    ok(res, await hospitalaria.patchHallazgo(req.params.id, body));
  }),
);

hallazgosRouter.post(
  '/:id/validar',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.validarHallazgo(req.params.id));
  }),
);

hallazgosRouter.post(
  '/:id/restaurar-propuesta',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.restaurarPropuesta(req.params.id));
  }),
);

hallazgosRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await hospitalaria.borrarHallazgo(req.params.id));
  }),
);
