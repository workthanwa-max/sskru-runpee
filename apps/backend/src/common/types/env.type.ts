export interface RawEnv {
  PORT?: string;
  HOST?: string;
  NODE_ENV?: string;
  CORS_ORIGINS?: string;
  APP_NAME?: string;
  APP_VERSION?: string;
  JWT_SECRET?: string;
  LOG_SLOW_THRESHOLD?: string;
  USERNAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_SSL_REQUIRED: string;
  STORAGE_BUCKET_NAME: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  MOCK_STORAGE?: string;
  STORAGE_DRIVER?: 'gcs' | 'disk' | 'mock';
  DISK_STORAGE_PATH?: string;
  JWT_EXPIRES_IN?: string;
  JWT_REFRESH_SECRET?: string;
  JWT_REFRESH_EXPIRES_IN?: string;
}
