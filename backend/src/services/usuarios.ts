import bcrypt from 'bcryptjs';
import { getAuth, forbidden, ownerIdForCreate } from '../auth/access.js';
import type { PublicUser, Rol } from '../auth/types.js';
import { nextSeq } from '../models/Counter.js';
import { UserModel, userToDto } from '../models/User.js';
import { signToken } from '../auth/jwt.js';
import { badRequest, notFound } from '../types.js';
import { nextPrefixedId } from '../utils.js';

const SALT = 10;

function visibleQuery() {
  const { scope } = getAuth();
  if (scope.all) return {};
  return { id: { $in: scope.userIds } };
}

export async function login(email: string, password: string) {
  const doc = await UserModel.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
  if (!doc || !doc.activo) throw badRequest('Correo o contraseña incorrectos', 'invalid_credentials');
  const okPass = await bcrypt.compare(password, doc.passwordHash);
  if (!okPass) throw badRequest('Correo o contraseña incorrectos', 'invalid_credentials');
  const user = userToDto(doc);
  const token = signToken({ sub: user.id, email: user.email, rol: user.rol });
  return { token, user };
}

export async function me() {
  return getAuth().user;
}

export async function listUsuarios() {
  const docs = await UserModel.find(visibleQuery()).sort({ rol: 1, nombre: 1 });
  const users = docs.map(userToDto);
  const byId = new Map(users.map((u) => [u.id, u]));
  return users.map((u) => ({
    ...u,
    liderNombre: u.reportsTo ? byId.get(u.reportsTo)?.nombre || u.reportsTo : null,
  }));
}

export async function getUsuario(id: string) {
  const doc = await UserModel.findOne({ id, ...visibleQuery() });
  if (!doc) throw notFound('Usuario', id);
  return userToDto(doc);
}

async function assertLider(id: string): Promise<PublicUser> {
  const lider = await UserModel.findOne({ id, rol: 'lider', activo: true });
  if (!lider) throw badRequest('El líder indicado no existe o no está activo');
  return userToDto(lider);
}

export async function crearUsuario(input: {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
  reportsTo?: string | null;
}) {
  const actor = getAuth().user;
  if (actor.rol === 'asistente') throw forbidden('Un asistente no puede crear usuarios');
  if (actor.rol === 'lider' && input.rol !== 'asistente') {
    throw forbidden('Un líder solo puede crear asistentes de su equipo');
  }

  let reportsTo: string | null = input.reportsTo ?? null;
  if (input.rol === 'asistente') {
    if (actor.rol === 'lider') reportsTo = actor.id;
    if (!reportsTo) throw badRequest('El asistente debe reportar a un líder');
    await assertLider(reportsTo);
    if (actor.rol === 'lider') ownerIdForCreate(reportsTo);
  } else {
    reportsTo = null;
  }

  const email = input.email.trim().toLowerCase();
  const exists = await UserModel.findOne({ email });
  if (exists) throw badRequest('Ya existe un usuario con ese correo');

  const seq = await nextSeq('usuario');
  const { id } = nextPrefixedId(seq - 1, 'U');
  const created = await UserModel.create({
    id,
    nombre: input.nombre.trim(),
    email,
    passwordHash: await bcrypt.hash(input.password, SALT),
    rol: input.rol,
    reportsTo,
    activo: true,
  });
  return userToDto(created);
}

export async function patchUsuario(
  id: string,
  input: {
    nombre?: string;
    email?: string;
    password?: string;
    rol?: Rol;
    reportsTo?: string | null;
    activo?: boolean;
  },
) {
  const actor = getAuth().user;
  const doc = await UserModel.findOne({ id, ...visibleQuery() });
  if (!doc) throw notFound('Usuario', id);

  if (actor.rol === 'asistente' && actor.id !== id) {
    throw forbidden();
  }
  if (actor.rol === 'lider' && doc.rol !== 'asistente' && actor.id !== id) {
    throw forbidden('Un líder solo gestiona a sus asistentes');
  }
  if (actor.rol === 'lider' && actor.id !== id && input.rol && input.rol !== 'asistente') {
    throw forbidden('No puede cambiar el perfil de ese usuario');
  }

  if (input.nombre != null) doc.nombre = input.nombre.trim();
  if (input.email != null) {
    const email = input.email.trim().toLowerCase();
    const clash = await UserModel.findOne({ email, id: { $ne: id } });
    if (clash) throw badRequest('Ya existe un usuario con ese correo');
    doc.email = email;
  }
  if (input.password) doc.passwordHash = await bcrypt.hash(input.password, SALT);
  if (input.activo != null) {
    if (actor.id === id && input.activo === false) throw badRequest('No puede desactivarse a sí mismo');
    doc.activo = input.activo;
  }
  if (input.rol && actor.rol === 'admin') {
    doc.rol = input.rol;
    if (input.rol !== 'asistente') doc.reportsTo = null;
  }
  if (input.reportsTo !== undefined && (actor.rol === 'admin' || actor.rol === 'lider')) {
    if (doc.rol !== 'asistente') {
      doc.reportsTo = null;
    } else if (actor.rol === 'lider') {
      doc.reportsTo = actor.id;
    } else if (input.reportsTo) {
      await assertLider(input.reportsTo);
      doc.reportsTo = input.reportsTo;
    } else {
      throw badRequest('El asistente debe reportar a un líder');
    }
  }

  await doc.save();
  return userToDto(doc);
}

export async function borrarUsuario(id: string) {
  const actor = getAuth().user;
  if (actor.rol === 'asistente') throw forbidden('No puede eliminar usuarios');
  if (actor.id === id) throw badRequest('No puede eliminarse a sí mismo');
  const doc = await UserModel.findOne({ id, ...visibleQuery() });
  if (!doc) throw notFound('Usuario', id);
  if (actor.rol === 'lider' && doc.rol !== 'asistente') {
    throw forbidden('Un líder solo puede eliminar asistentes de su equipo');
  }
  if (doc.rol === 'admin') {
    const remaining = await UserModel.countDocuments({ rol: 'admin', activo: true, id: { $ne: id } });
    if (!remaining) throw badRequest('Debe quedar al menos un administrador');
  }
  await UserModel.deleteOne({ id });
  return { deleted: id };
}
