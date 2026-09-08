import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { HttpError } from './types.js';

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export function ok(res: Response, data: unknown, status = 200) {
  return res.status(status).json({ ok: true, data });
}

export function sendCsv(res: Response, filename: string, content: string) {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.send(content);
}

export function sendJsonFile(res: Response, filename: string, data: unknown) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.send(JSON.stringify(data, null, 1));
}

export function validate<T>(schema: ZodSchema<T>, payload: unknown): T {
  return schema.parse(payload);
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      error: {
        code: 'validation',
        message: 'Datos inválidos',
        details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
    });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      ok: false,
      error: { code: err.code, message: err.message },
    });
  }
  const mongo = err as { code?: number };
  if (mongo.code === 11000) {
    return res.status(409).json({
      ok: false,
      error: { code: 'conflict', message: 'Ya existe un registro con ese identificador' },
    });
  }
  console.error(err);
  return res.status(500).json({
    ok: false,
    error: { code: 'internal', message: 'Error interno del servidor' },
  });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ ok: false, error: { code: 'not_found', message: 'Ruta no encontrada' } });
}
