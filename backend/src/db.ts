import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDb(): Promise<void> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, {
    dbName: 'anga',
    family: 4,
    serverSelectionTimeoutMS: 20000,
  });
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect();
}
