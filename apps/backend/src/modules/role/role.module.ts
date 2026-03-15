import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';
import { RoleListener } from 'src/listeners/role.listener';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [RoleController],
  providers: [RoleService, RoleListener],
  exports: [RoleService],
})
export class RoleModule {}
