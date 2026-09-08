import type { NextFunction, Request, Response } from 'express';
import { UserModel, userToDto } from '../models/User.js';
import { authStore, unauthorized } from './access.js';
import { verifyToken } from './jwt.js';
import type { AccessScope, PublicUser } from './types.js';

export async function buildScope(user: PublicUser): Promise<AccessScope> {
  if (user.rol === 'admin') return { all: true, userIds: [] };
  if (user.rol === 'asistente') return { all: false, userIds: [user.id] };
  const team = await UserModel.find({ reportsTo: user.id, activo: true }).select('id').lean();
  return { all: false, userIds: [user.id, ...team.map((u) => String(u.id))] };
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.header('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) throw unauthorized('Falta el token de sesión');
    const payload = verifyToken(token);
    const doc = await UserModel.findOne({ id: payload.sub });
    if (!doc || !doc.activo) throw unauthorized('Usuario inactivo o no encontrado');
    const user = userToDto(doc);
    const scope = await buildScope(user);
    req.auth = user;
    req.scope = scope;
    authStore.run({ user, scope }, () => next());
  } catch (err) {
    next(err);
  }
}
