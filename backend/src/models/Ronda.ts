import mongoose from 'mongoose';
import type { Ronda } from '../types.js';

const resultadoSchema = new mongoose.Schema(
  {
    r: { type: String, enum: ['C', 'NC', 'NA'], required: true },
    obs: { type: String, default: '' },
  },
  { _id: false },
);

const rondaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    servicioCod: { type: String, required: true, index: true },
    servicio: { type: String, required: true },
    fecha: { type: String, required: true, index: true },
    lider: { type: String, default: '' },
    acompanantes: { type: String, default: '' },
    obs: { type: String, default: '' },
    resultados: { type: Map, of: resultadoSchema, default: () => new Map() },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

rondaSchema.set('toJSON', {
  virtuals: false,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, resultados, createdAt, updatedAt, ...rest } = ret as Record<string, unknown> & {
      resultados?: Map<string, unknown> | Record<string, unknown>;
    };
    void _id;
    return {
      ...rest,
      resultados: mapToRecord(resultados),
      createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
      updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
    };
  },
});

function mapToRecord(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (value instanceof Map) return Object.fromEntries(value);
  if (typeof value === 'object') return value as Record<string, unknown>;
  return {};
}

export const RondaModel = mongoose.model('Ronda', rondaSchema);

export function rondaToDto(doc: mongoose.Document | Record<string, unknown>): Ronda {
  const json = typeof (doc as mongoose.Document).toJSON === 'function'
    ? (doc as mongoose.Document).toJSON()
    : {
        ...(doc as Record<string, unknown>),
        resultados: mapToRecord((doc as { resultados?: unknown }).resultados),
      };
  return json as unknown as Ronda;
}
