export type Rol = 'admin' | 'lider' | 'asistente';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  reportsTo: string | null;
  activo: boolean;
  liderNombre?: string | null;
}

export const ROL_LABEL: Record<Rol, string> = {
  admin: 'Administrador',
  lider: 'Líder',
  asistente: 'Asistente',
};
