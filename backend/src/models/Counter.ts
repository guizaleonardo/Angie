import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { versionKey: false },
);

export const CounterModel = mongoose.model('Counter', counterSchema);

export async function nextSeq(name: string): Promise<number> {
  const doc = await CounterModel.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  return doc.seq;
}

export async function setSeq(name: string, seq: number): Promise<void> {
  await CounterModel.findByIdAndUpdate(name, { seq }, { upsert: true });
}

export async function getSeq(name: string): Promise<number> {
  const doc = await CounterModel.findById(name).lean();
  return doc?.seq ?? 0;
}
