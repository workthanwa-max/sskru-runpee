import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { CurriculumReqBudgetSubmitInput } from '../dto/curriculum.dto';
import { CurriculumService } from './curriculum.service';
import { FileStorageService } from 'src/common/storage/file-storage.service';

// Curriculum Service
@Injectable()
export class CurriculumApplicationService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly curriculumService: CurriculumService,
    private readonly storage: FileStorageService,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CurriculumApplicationService.name);
  }

  async submit(id: string, requestedBy: string, input: CurriculumReqBudgetSubmitInput) {
    this.logger.info({ requestedBy, id, input }, `Starting ${this.submit.name}`);

    await this.curriculumService.handleRequestSubmit(id, requestedBy);

    let resp = await this.db.query.curriculumApplications.findFirst({
      where: eq(schema.curriculumApplications.id, id),
    });

    let targetPath: string | undefined;
    if (input.attachFile) {
      this.logger.debug(
        {
          attachFile: input.attachFile,
        },
        'Processing attach file',
      );
      targetPath = this.storage.getMovePath(input.attachFile, 'curriculum');
    }

    if (resp) {
      const [updated] = await this.db
        .update(schema.curriculumApplications)
        .set({
          minimumEnrollment: input.minimumRegister,
          courseFee: input.fee,
          qualificationRequirements: input.applicantQualifications,
          additionalConditions: input.applicantQualificationConditions,
          attachmentUrl: targetPath,
        })
        .returning();
      resp = updated;
    } else {
      const [created] = await this.db.insert(schema.curriculumApplications).values({
        id,
        minimumEnrollment: input.minimumRegister,
        courseFee: input.fee,
        qualificationRequirements: input.applicantQualifications,
        additionalConditions: input.applicantQualificationConditions,
        attachmentUrl: targetPath,
      });
      resp = created;
    }

    if (input.attachFile && targetPath) {
      this.logger.debug(
        {
          attachFile: input.attachFile,
          targetPath,
        },
        'Processing move file',
      );
      await this.storage.moveObject(input.attachFile, targetPath);
      await this.storage.setHoldObject(targetPath);
    }

    return resp;
  }
}
