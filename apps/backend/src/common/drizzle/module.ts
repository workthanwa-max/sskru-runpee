import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { refs } from '../consts/refs.const';
import { dbClient } from './client';
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: refs.DRIZZLE_CLIENT,
      useFactory: () => {
        return dbClient;
      },
    },
  ],
  exports: [refs.DRIZZLE_CLIENT],
})
export class DrizzleModule {}
