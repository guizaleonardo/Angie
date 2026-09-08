import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { requireAuth } from './auth/middleware.js';
import { corsOptions, requireFrontendOrigin } from './auth/origin.js';
import { config } from './config.js';
import { errorHandler, notFoundHandler } from './http.js';
import { authRouter } from './routes/auth.js';
import { catalogosRouter } from './routes/catalogos.js';
import { datosRouter, dashboardRouter } from './routes/datos.js';
import { hallazgosRouter } from './routes/hallazgos.js';
import { rondasRouter } from './routes/rondas.js';
import { usuariosRouter } from './routes/usuarios.js';
import { visitasRouter } from './routes/visitas.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors(corsOptions));
  app.use(requireFrontendOrigin);
  app.use(express.json({ limit: '12mb' }));
  app.use(morgan(config.isProd ? 'combined' : 'dev'));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, data: { status: 'up', time: new Date().toISOString() } });
  });

  app.use('/api/auth', authRouter);
  app.use('/api', requireAuth);
  app.use('/api/usuarios', usuariosRouter);
  app.use('/api/catalogos', catalogosRouter);
  app.use('/api/rondas', rondasRouter);
  app.use('/api/hallazgos', hallazgosRouter);
  app.use('/api/visitas', visitasRouter);
  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/datos', datosRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
