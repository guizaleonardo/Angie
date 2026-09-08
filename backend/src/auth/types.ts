export type Rol = 'admin' | 'lider' | 'asistente';

export const ROLES: Rol[] = ['admin', 'lider', 'asistente'];

export interface PublicUser {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  reportsTo: string | null;
  activo: boolean;
}

export interface AccessScope {
  all: boolean;
  userIds: string[];
}

export interface AccessContext {
  user: PublicUser;
  scope: AccessScope;
}
