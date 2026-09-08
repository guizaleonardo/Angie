import mongoose from 'mongoose';
import type { Hallazgo } from '../types.js';

const hallazgoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    rondaId: { type: String, required: true, index: true },
    itemId: { type: String, required: true },
    servicioCod: { type: String, default: '', index: true },
    servicio: { type: String, default: '' },
    bloque: { type: String, default: '' },
    fecha: { type: String, default: '' },
    desc: { type: String, default: '' },
    criticidad: { type: String, enum: ['Alta', 'Media', 'Baja'], default: 'Media' },
    que: { type: String, default: '' },
    porque: { type: String, default: '' },
    donde: { type: String, default: '' },
    quien: { type: String, default: '' },
    cuando: { type: String, default: '' },
    como: { type: String, default: '' },
    estado: { type: String, enum: ['Abierto', 'En ejecución', 'Cerrado'], default: 'Abierto', index: true },
    fechaCierre: { type: String, default: '' },
    evidencia: { type: String, default: '' },
    sugerido: { type: Boolean, default: false },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

hallazgoSchema.index({ rondaId: 1, itemId: 1 }, { unique: true });

hallazgoSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, createdAt, updatedAt, ...rest } = ret as Record<string, unknown>;
    void _id;
    void createdAt;
    void updatedAt;
    return rest;
  },
});

export const HallazgoModel = mongoose.model('Hallazgo', hallazgoSchema);

export function hallazgoToDto(doc: mongoose.Document | Record<string, unknown>): Hallazgo {
  if (typeof (doc as mongoose.Document).toJSON === 'function') {
    return (doc as mongoose.Document).toJSON() as unknown as Hallazgo;
  }
  const raw = doc as Record<string, unknown>;
  const { _id, __v, createdAt, updatedAt, ...rest } = raw;
  void _id;
  void __v;
  void createdAt;
  void updatedAt;
  return rest as unknown as Hallazgo;
}
