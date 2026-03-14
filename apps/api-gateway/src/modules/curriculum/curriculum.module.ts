import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CurriculumController } from './curriculum.controller';
import { CurriculumApplicationService } from './services/curriculum-application.service';
import { CurriculumApprovalActionService } from './services/curriculum-approval-action.service';
import { CurriculumGeneralService } from './services/curriculum-general.service';
import { CurriculumService } from './services/curriculum.service';
import { CurriculumListener } from 'src/listeners/curriculum.listener';
import { CurriculumRepository } from 'src/repositories/curriculum.repository';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [CurriculumController],
  providers: [
    CurriculumService,
    CurriculumGeneralService,
    CurriculumApplicationService,
    CurriculumApprovalActionService,
    CurriculumListener,
    CurriculumRepository,
  ],
  exports: [
    CurriculumService,
    CurriculumGeneralService,
    CurriculumApplicationService,
    CurriculumApprovalActionService,
    CurriculumRepository,
  ],
})
export class CurriculumRestModule {}
