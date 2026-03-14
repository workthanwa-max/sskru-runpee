import { registerAs } from '@nestjs/config';
import { ConfigType } from 'src/common/types/config.type';
import { getOsEnv } from 'src/common/utils/env.util';

export default registerAs<ConfigType['jwt']>('jwt', () => ({
  secret: getOsEnv('JWT_SECRET'),
  expiresIn: getOsEnv('JWT_EXPIRES_IN', '1d'),
  refreshSecret: getOsEnv('JWT_REFRESH_SECRET', getOsEnv('JWT_SECRET')),
  refreshExpiresIn: getOsEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
}));
