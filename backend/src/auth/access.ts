import { AsyncLocalStorage } from 'node:async_hooks';
import { HttpError } from '../types.js';
import type { AccessContext, AccessScope } from './types.js';

export const authStore = new AsyncLocalStorage<AccessContext>();

export function unauthorized(message = 'Debe iniciar sesión'): HttpError {
  return new HttpError(401, message, 'unauthorized');
}

export function forbidden(message = 'No tiene permiso para esta información'): HttpError {
  return new HttpError(403, message, 'forbidden');
}

export function getAuth(): AccessContext {
  const ctx = authStore.getStore();
  if (!ctx) throw unauthorized();
  return ctx;
}

export function ownerQuery(field = 'userId'): Record<string, unknown> {
  const { scope } = getAuth();
  if (scope.all) return {};
  return { [field]: { $in: scope.userIds } };
}

export function assertCanAccessUser(userId: string | undefined): void {
  const { scope } = getAuth();
  if (scope.all) return;
  if (!userId || !scope.userIds.includes(userId)) throw forbidden();
}

export function ownerIdForCreate(requested?: string): string {
  const { user } = getAuth();
  const owner = requested || user.id;
  assertCanAccessUser(owner);
  return owner;
}

export function requireAdmin(message = 'Solo el administrador puede hacer esto'): void {
  if (getAuth().user.rol !== 'admin') throw forbidden(message);
}

export function requireAdminOrLider(message = 'Solo un líder o administrador puede hacer esto'): void {
  const rol = getAuth().user.rol;
  if (rol !== 'admin' && rol !== 'lider') throw forbidden(message);
}

export function canManageUser(actorRol: string, targetRol: string): boolean {
  if (actorRol === 'admin') return true;
  if (actorRol === 'lider' && targetRol === 'asistente') return true;
  return false;
}

export function scopeFilter(scope: AccessScope): Record<string, unknown> {
  if (scope.all) return {};
  return { userId: { $in: scope.userIds } };
}
