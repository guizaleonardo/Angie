import type { CorsOptions } from 'cors';
import type { NextFunction, Request, Response } from 'express';
import { config } from '../config.js';

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, '');
}

export function allowedOrigins(): string[] {
  const fromEnv = config.corsOrigin
    .split(',')
    .map(normalizeOrigin)
    .filter((origin) => origin && origin !== '*');
  return fromEnv.length ? fromEnv : ['http://localhost:5173', 'http://127.0.0.1:5173'];
}

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  return allowedOrigins().includes(normalizeOrigin(origin));
}

function originFromRequest(req: Request): string | undefined {
  const origin = req.header('origin');
  if (origin) return normalizeOrigin(origin);
  const referer = req.header('referer');
  if (!referer) return undefined;
  try {
    return new URL(referer).origin;
  } catch {
    return undefined;
  }
}

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, false);
      return;
    }
    callback(null, isAllowedOrigin(origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

export function requireFrontendOrigin(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  if (req.method === 'GET' && (req.path === '/api/health' || req.path === '/health')) {
    next();
    return;
  }
  const origin = originFromRequest(req);
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({
      ok: false,
      error: {
        code: 'forbidden_origin',
        message: 'Solo se aceptan peticiones desde el frontend autorizado',
      },
    });
    return;
  }
  next();
}
