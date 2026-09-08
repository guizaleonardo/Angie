import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { unauthorized } from './access.js';
import type { Rol } from './types.js';

export interface JwtPayload {
  sub: string;
  email: string;
  rol: Rol;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded || typeof decoded !== 'object' || typeof decoded.sub !== 'string') {
      throw unauthorized('Token inválido');
    }
    const rol = decoded.rol;
    if (rol !== 'admin' && rol !== 'lider' && rol !== 'asistente') {
      throw unauthorized('Token inválido');
    }
    return {
      sub: decoded.sub,
      email: typeof decoded.email === 'string' ? decoded.email : '',
      rol,
    };
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err) throw err;
    throw unauthorized('Token inválido o vencido');
  }
}
