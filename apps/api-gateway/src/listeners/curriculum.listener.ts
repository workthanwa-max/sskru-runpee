import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { ApprovalActionSubmitted, RequestSubmitted } from 'src/events/curriculum.event';
import { CourseImplementationStep } from 'src/modules/curriculum/dto/curriculum.dto';

@Injectable()
export class CurriculumListener {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CurriculumListener.name);
  }
  @OnEvent(RequestSubmitted.name)
  async handleRequestSubmittedEvent(event: RequestSubmitted) {
    this.logger.info({ event }, `Received ${RequestSubmitted.name} event`);

    try {
      const { count } = await this.db
        .delete(schema.approvalActions)
        .where(eq(schema.approvalActions.curriculumId, event.payload.id));

      this.logger.info({ processed: { count } }, `Successfully processed ${count} ${RequestSubmitted.name} event`);
    } catch (error) {
      this.logger.error(error, `Failed to process ${RequestSubmitted.name} event`);
    }
  }
  @OnEvent(ApprovalActionSubmitted.name)
  async handleApprovalActionSubmittedEvent(event: ApprovalActionSubmitted) {
    this.logger.info({ event }, `Received ${ApprovalActionSubmitted.name} event`);

    try {
      const steps: Record<CourseImplementationStep, CourseImplementationStep> = {
        [CourseImplementationStep.UNDER_CONSIDERATION]: CourseImplementationStep.ACADEMIC_COMMITTEE, //Step: 1 -> 2
        [CourseImplementationStep.ACADEMIC_COMMITTEE]: CourseImplementationStep.ACADEMIC_COUNCIL, //Step: 2 -> 3
        [CourseImplementationStep.ACADEMIC_COUNCIL]: CourseImplementationStep.UNIVERSITY_COUNCIL, //Step: 3 -> 4
        [CourseImplementationStep.UNIVERSITY_COUNCIL]: CourseImplementationStep.APPROVED,
        [CourseImplementationStep.APPROVED]: CourseImplementationStep.APPROVED,
      };

      if (event.payload.isApproved) {
        await this.db
          .update(schema.curriculums)
          .set({
            status:
              event.payload.approvalStep === CourseImplementationStep.UNIVERSITY_COUNCIL ? 'APPROVED' : 'IN_PROGRESS',
            currentStep: steps[event.payload.approvalStep],
          })
          .where(eq(schema.curriculums.id, event.payload.curriculumId));
      } else {
        await this.db
          .update(schema.curriculums)
          .set({
            status: 'REJECTED',
            rejectionNote: event.payload.remarks,
          })
          .where(eq(schema.curriculums.id, event.payload.curriculumId));
      }

      this.logger.info(
        { processed: { prevStep: event.payload.approvalStep, step: steps[event.payload.approvalStep] } },
        `Successfully processed  ${ApprovalActionSubmitted.name} event`,
      );
    } catch (error) {
      this.logger.error(error, `Failed to process ${ApprovalActionSubmitted.name} event`);
    }
  }
}
