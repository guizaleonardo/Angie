import mongoose from 'mongoose';
import type { Visita } from '../types.js';

const resultadoSchema = new mongoose.Schema(
  {
    r: { type: String, enum: ['C', 'NC', 'NA'], required: true },
    obs: { type: String, default: '' },
  },
  { _id: false },
);

const puntoSchema = new mongoose.Schema(
  {
    n: { type: String, default: '' },
    c: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { _id: false },
);

const obsHigieneSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    cargo: { type: String, default: '' },
    momento: { type: String, default: '1' },
    accion: { type: String, enum: ['FR', 'LM', 'OM'], default: 'OM' },
  },
  { _id: false },
);

const hallazgoAmbSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    scope: { type: String, default: 'T' },
    itemId: { type: String, default: '' },
    area: { type: String, default: '' },
    bloque: { type: String, default: '' },
    desc: { type: String, default: '' },
    criticidad: { type: String, enum: ['Alta', 'Media', 'Baja'], default: 'Media' },
    que: { type: String, default: '' },
    porque: { type: String, default: '' },
    donde: { type: String, default: '' },
    quien: { type: String, default: '' },
    cuando: { type: String, default: '' },
    como: { type: String, default: '' },
    estado: { type: String, enum: ['Abierto', 'En ejecución', 'Cerrado'], default: 'Abierto' },
    fechaCierre: { type: String, default: '' },
    evidencia: { type: String, default: '' },
    sugerido: { type: Boolean, default: false },
  },
  { _id: false },
);

const visitaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    modalidad: { type: String, enum: ['ambulatoria', 'principal'], required: true, index: true },
    userId: { type: String, required: true, index: true },
    sede: { type: String, default: '' },
    municipio: { type: String, default: '' },
    fecha: { type: String, required: true, index: true },
    auditor: { type: String, default: '' },
    acompanantes: { type: String, default: '' },
    alcance: { type: String, default: '' },
    concl: { type: String, default: '' },
    areas: { type: [String], default: [] },
    bloques: { type: [String], default: [] },
    transv: { type: mongoose.Schema.Types.Mixed, default: {} },
    areasRes: { type: mongoose.Schema.Types.Mixed, default: {} },
    puntosHM: { type: [puntoSchema], default: [] },
    puntosRT: { type: [puntoSchema], default: [] },
    obsHM: { type: [obsHigieneSchema], default: [] },
    hallazgos: { type: [hallazgoAmbSchema], default: [] },
    seq: { type: Number, default: 0 },
  },
  { timestamps: true },
);

visitaSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, createdAt, updatedAt, ...rest } = ret as Record<string, unknown>;
    void _id;
    return {
      ...rest,
      createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
      updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
    };
  },
});

export const VisitaModel = mongoose.model('Visita', visitaSchema);

export function visitaToDto(doc: mongoose.Document | Record<string, unknown>): Visita {
  if (typeof (doc as mongoose.Document).toJSON === 'function') {
    return (doc as mongoose.Document).toJSON() as unknown as Visita;
  }
  const raw = { ...(doc as Record<string, unknown>) };
  delete raw._id;
  delete raw.__v;
  return raw as unknown as Visita;
}
