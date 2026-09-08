import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ok, validate } from '../http.js';
import * as usuarios from '../services/usuarios.js';

export const usuariosRouter = Router();

const crearSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  rol: z.enum(['admin', 'lider', 'asistente']),
  reportsTo: z.string().nullable().optional(),
});

const patchSchema = z.object({
  nombre: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  rol: z.enum(['admin', 'lider', 'asistente']).optional(),
  reportsTo: z.string().nullable().optional(),
  activo: z.boolean().optional(),
});

usuariosRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    ok(res, await usuarios.listUsuarios());
  }),
);

usuariosRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = validate(crearSchema, req.body);
    ok(res, await usuarios.crearUsuario(body), 201);
  }),
);

usuariosRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await usuarios.getUsuario(req.params.id));
  }),
);

usuariosRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const body = validate(patchSchema, req.body);
    ok(res, await usuarios.patchUsuario(req.params.id, body));
  }),
);

usuariosRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    ok(res, await usuarios.borrarUsuario(req.params.id));
  }),
);
