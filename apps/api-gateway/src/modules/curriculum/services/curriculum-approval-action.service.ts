import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { ApprovalActionSubmitted } from 'src/events/curriculum.event';
import { SubmitCourseImplementationInput } from '../dto/curriculum.dto';
import { CurriculumService } from './curriculum.service';
import { FileStorageService } from 'src/common/storage/file-storage.service';

// Curriculum Service
@Injectable()
export class CurriculumApprovalActionService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly curriculumService: CurriculumService,
    private readonly storage: FileStorageService,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CurriculumApprovalActionService.name);
  }

  async submit(curriculumId: string, approvedBy: string, input: SubmitCourseImplementationInput) {
    this.logger.info({ approvedBy, curriculumId, input }, `Starting ${this.submit.name}`);
    input.attachFiles = input.attachFiles
      ? await Promise.all(
          input.attachFiles?.map(async (att) => {
            const targetPath = this.storage.getMovePath(att, 'approval-action');
            await this.storage.moveObject(att, targetPath);
            await this.storage.setHoldObject(targetPath);
            return targetPath;
          }),
        )
      : [];

    this.logger.debug(`Handled file attaches ${input.attachFiles.length}`);

    const [resp] = await this.db
      .insert(schema.approvalActions)
      .values({
        curriculumId,
        approvedBy,
        approvalStep: input.step,
        agendaNumber: input.agenda,
        isApproved: input.approve,
        meetingTitle: input.title,
        remarks: input.note,
        meetingTime: input.time,
        meetingDate: input.date,
        attachmentUrls: input.attachFiles,
      })
      .returning();

    this.emitter.emit(ApprovalActionSubmitted.name, new ApprovalActionSubmitted(resp));
    return resp;
  }
}
