import bcrypt from 'bcryptjs';
import { config } from './config.js';
import { nextSeq } from './models/Counter.js';
import { UserModel } from './models/User.js';
import { nextPrefixedId } from './utils.js';

export async function seedAdmin(): Promise<void> {
  const exists = await UserModel.findOne({ email: config.adminEmail });
  if (exists) return;
  const seq = await nextSeq('usuario');
  const { id } = nextPrefixedId(seq - 1, 'U');
  await UserModel.create({
    id,
    nombre: 'Administrador',
    email: config.adminEmail,
    passwordHash: await bcrypt.hash(config.adminPassword, 10),
    rol: 'admin',
    reportsTo: null,
    activo: true,
  });
  console.log(`Usuario admin inicial: ${config.adminEmail}`);
}
