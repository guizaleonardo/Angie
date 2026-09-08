import { Router } from 'express';
import { asyncHandler, ok, sendCsv, sendJsonFile, validate } from '../http.js';
import * as hospitalaria from '../services/hospitalaria.js';
import { toCsv } from '../utils.js';
import { z } from 'zod';

export const datosRouter = Router();
export const dashboardRouter = Router();

dashboardRouter.get(
  '/hospitalaria',
  asyncHandler(async (_req, res) => {
    ok(res, await hospitalaria.dashboardHospitalaria());
  }),
);

datosRouter.get(
  '/hospitalaria',
  asyncHandler(async (_req, res) => {
    ok(res, await hospitalaria.dumpHospitalaria());
  }),
);

datosRouter.get(
  '/hospitalaria/respaldo',
  asyncHandler(async (_req, res) => {
    const data = await hospitalaria.dumpHospitalaria();
    sendJsonFile(res, `respaldo_rondas_${new Date().toISOString().slice(0, 10)}.json`, data);
  }),
);

datosRouter.put(
  '/hospitalaria',
  asyncHandler(async (req, res) => {
    const body = validate(
      z.object({
        version: z.number().optional(),
        rondas: z.array(z.unknown()),
        hallazgos: z.array(z.unknown()).optional(),
        seq: z.number().optional(),
      }),
      req.body,
    );
    ok(res, await hospitalaria.restoreHospitalaria(body));
  }),
);

datosRouter.delete(
  '/hospitalaria',
  asyncHandler(async (_req, res) => {
    ok(res, await hospitalaria.borrarHospitalaria());
  }),
);

datosRouter.get(
  '/hospitalaria/csv/rondas',
  asyncHandler(async (_req, res) => {
    sendCsv(res, 'rondas_consolidado.csv', toCsv(await hospitalaria.csvRondas()));
  }),
);

datosRouter.get(
  '/hospitalaria/csv/detalle',
  asyncHandler(async (_req, res) => {
    sendCsv(res, 'rondas_detalle_items.csv', toCsv(await hospitalaria.csvDetalle()));
  }),
);

datosRouter.get(
  '/hospitalaria/csv/hallazgos',
  asyncHandler(async (_req, res) => {
    sendCsv(res, 'planes_mejoramiento_5w1h.csv', toCsv(await hospitalaria.csvHallazgos()));
  }),
);
