import { registerAs } from '@nestjs/config';
import { ConfigType } from 'src/common/types/config.type';
import { getOsEnv, toNumber } from 'src/common/utils/env.util';

export default registerAs<ConfigType['app']>('app', () => ({
  port: toNumber(getOsEnv('PORT', '8080')),
  host: getOsEnv('HOST', '0.0.0.0'),
  nodeEnv: getOsEnv('NODE_ENV', 'development') as 'production' | 'development' | 'test',
  corsOrigins: getOsEnv('CORS_ORIGINS', 'http://localhost:3000')?.split(',').filter(Boolean),
  appName: getOsEnv('APP_NAME'),
  appVersion: getOsEnv('APP_VERSION', 'vLocal-dev'),
  slowThreshold: toNumber(getOsEnv('LOG_SLOW_THRESHOLD', '1500')),
  storageDriver: (getOsEnv('STORAGE_DRIVER', 'disk') as any) || 'disk',
  diskStoragePath: getOsEnv('DISK_STORAGE_PATH', 'uploads'),
}));
