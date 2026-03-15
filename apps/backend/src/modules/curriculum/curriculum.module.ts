import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './services/curriculum.service';
import { CurriculumListener } from 'src/listeners/curriculum.listener';
import { CurriculumRepository } from 'src/repositories/curriculum.repository';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [CurriculumController],
  providers: [
    CurriculumService,
    CurriculumListener,
    CurriculumRepository,
  ],
  exports: [
    CurriculumService,
    CurriculumRepository,
  ],
})
export class CurriculumRestModule {}
