import 'dotenv/config';

function env(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export const config = {
  port: Number(env('PORT', '4000')),
  mongoUri: env('MONGODB_URI', 'mongodb://127.0.0.1:27017/anga'),
  corsOrigin: env('CORS_ORIGIN', 'http://localhost:5173,http://127.0.0.1:5173'),
  apiKey: env('API_KEY'),
  nodeEnv: env('NODE_ENV', 'development'),
  isProd: env('NODE_ENV') === 'production',
  jwtSecret: env('JWT_SECRET', 'anga-dev-secret-cambiar'),
  jwtExpiresIn: env('JWT_EXPIRES_IN', '12h'),
  adminEmail: env('ADMIN_EMAIL', 'admin@clinica.local').toLowerCase(),
  adminPassword: env('ADMIN_PASSWORD', 'admin123'),
};
