import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './services/personnel.service';
import { PersonnelListener } from 'src/listeners/personnel.listener';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [PersonnelController],
  providers: [PersonnelService, PersonnelListener],
  exports: [PersonnelService],
})
export class PersonnelModule {}
