import mongoose from 'mongoose';
import type { PublicUser, Rol } from '../auth/types.js';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    rol: { type: String, enum: ['admin', 'lider', 'asistente'], required: true, index: true },
    reportsTo: { type: String, default: null, index: true },
    activo: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, passwordHash, createdAt, updatedAt, ...rest } = ret as Record<string, unknown>;
    void _id;
    void passwordHash;
    return {
      ...rest,
      createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
      updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
    };
  },
});

export const UserModel = mongoose.model('User', userSchema);

export function userToDto(doc: mongoose.Document | Record<string, unknown>): PublicUser {
  const raw =
    typeof (doc as mongoose.Document).toJSON === 'function'
      ? ((doc as mongoose.Document).toJSON() as Record<string, unknown>)
      : { ...(doc as Record<string, unknown>) };
  return {
    id: String(raw.id),
    nombre: String(raw.nombre || ''),
    email: String(raw.email || ''),
    rol: raw.rol as Rol,
    reportsTo: raw.reportsTo == null || raw.reportsTo === '' ? null : String(raw.reportsTo),
    activo: raw.activo !== false,
  };
}
