import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SystemController } from './system.controller';
import { SystemService } from './services/system.service';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService],
})
export class SystemModule {}
