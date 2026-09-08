import dns from 'node:dns';
import { createApp } from './app.js';
import { getCatalog } from './catalog/index.js';
import { config } from './config.js';
import { connectDb } from './db.js';
import { seedAdmin } from './seed.js';

dns.setDefaultResultOrder('ipv4first');

async function main() {
  getCatalog('hospitalaria');
  getCatalog('ambulatoria');
  getCatalog('principal');
  await connectDb();
  await seedAdmin();
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`ANGA API en http://localhost:${config.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
