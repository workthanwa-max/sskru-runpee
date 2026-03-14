import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRestController } from './auth.controller';
import { IdentityService } from './services/identity.service';
import { IdentityListener } from 'src/listeners/identity.listener';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [AuthRestController],
  providers: [IdentityService, IdentityListener],
  exports: [IdentityService],
})
export class AuthRestModule {}
