import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './services/permission.service';
import { PermissionListener } from 'src/listeners/permission.listener';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionListener],
  exports: [PermissionService],
})
export class PermissionModule {}
