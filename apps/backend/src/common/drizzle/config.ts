import { defineConfig } from 'drizzle-kit';
import { getOsEnv } from '../utils/env.util';

export const DB_URL = `postgresql://${getOsEnv('DB_USERNAME')}:${getOsEnv('DB_PASSWORD')}@${getOsEnv(
  'DB_HOST',
)}:${getOsEnv('DB_PORT')}/oass${getOsEnv('DB_SSL_REQUIRED') === '1' ? '?sslmode=require' : ''}`;

export default defineConfig({
  dialect: 'postgresql',
  out: './src/common/drizzle/migrations',
  schema: './src/common/drizzle/tables/index.ts',
  dbCredentials: {
    url: DB_URL,
  },
  verbose: true,
  strict: true,
});
