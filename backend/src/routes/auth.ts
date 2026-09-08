import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../auth/middleware.js';
import { asyncHandler, ok, validate } from '../http.js';
import * as usuarios from '../services/usuarios.js';

export const authRouter = Router();

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const body = validate(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
      req.body,
    );
    ok(res, await usuarios.login(body.email, body.password));
  }),
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (_req, res) => {
    ok(res, await usuarios.me());
  }),
);
