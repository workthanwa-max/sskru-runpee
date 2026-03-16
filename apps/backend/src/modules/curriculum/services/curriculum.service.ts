import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PinoLogger } from 'nestjs-pino';
import { eq, getTableColumns } from 'drizzle-orm';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema, type Curriculum } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { RequestSubmitted, ApprovalActionSubmitted } from 'src/events/curriculum.event';
import { CurriculumReqCurriculumSubmitInput, CurriculumReqGeneralSubmitInput, CurriculumReqBudgetSubmitInput, SubmitCourseImplementationInput } from '../dto/curriculum.dto';
import { CurriculumRepository } from '../repositories/curriculum.repository';
import { CurriculumDomain } from '../domain/curriculum.domain';
import { FileStorageService } from 'src/common/storage/file-storage.service';

// Curriculum Service
@Injectable()
export class CurriculumService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly repository: CurriculumRepository,
    private readonly storage: FileStorageService,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CurriculumService.name);
  }

  async findAll(filters?: Partial<Curriculum>) {
    return this.repository.findAll(filters);
  }

  async findReviewing() {
    return this.repository.findReviewing();
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  async findGeneralInfo(curriculumId: string) {
    return this.repository.findGeneralInfo(curriculumId);
  }

  async findActivities(curriculumId: string) {
    return this.repository.findActivities(curriculumId);
  }

  async findApplications(curriculumId: string) {
    return this.repository.findApplications(curriculumId);
  }

  async findApplicationBudgetEstimates(curriculumId: string) {
    return this.repository.findApplicationBudgetEstimates(curriculumId);
  }

  async findCourseStructures(curriculumId: string) {
    return this.repository.findCourseStructures(curriculumId);
  }

  async findLearningOutcomes(curriculumId: string) {
    return this.repository.findLearningOutcomes(curriculumId);
  }

  async update(id: string, input: Partial<Curriculum>) {
    this.logger.info(input, `Starting ${this.update.name}`);

    const curriculum = await this.repository.update(id, input);
    if (!curriculum) {
      throw new NotFoundError(`Curriculum with ID ${id} not found`);
    }
    return curriculum;
  }

  async remove(id: string) {
    const curriculum = await this.repository.delete(id);
    if (!curriculum) {
      throw new NotFoundError(`Curriculum with ID ${id} not found`);
    }
    return curriculum;
  }

  async submit(curriculumId: string) {
    this.logger.info({ curriculumId }, `Starting ${this.submit.name}`);

    const curriculum = await this.repository.findOne(curriculumId);
    const generalInfo = await this.repository.findGeneralInfo(curriculumId);

    // Apply Domain Logic
    CurriculumDomain.validateSubmission(curriculum as any, generalInfo);

    const resp = await this.update(curriculumId, { status: 'SUBMITTED', currentStep: 'UNDER_CONSIDERATION' });

    this.emitter.emit(RequestSubmitted.name, new RequestSubmitted(resp));

    return resp;
  }

  async submitContent(id: string, requestedBy: string, input: CurriculumReqCurriculumSubmitInput) {
    this.logger.info({ id, input }, `Starting ${this.submitContent.name}`);

    await this.handleRequestSubmit(id, requestedBy);

    let resp = await this.repository.getCurriculumWithColumns(id);

    if (resp) {
      resp = await this.repository.update(id, {
        objectives: input.objectives,
        content: input.content,
        requestedBy: requestedBy,
      });
    } else {
      resp = await this.repository.create({
        id,
        objectives: input.objectives,
        content: input.content,
        requestedBy: requestedBy,
      });
    }

    this.logger.debug(
      {
        courseStructuresCount: input.courseStructures.length,
        learningOutcomesCount: input.learningOutcomes.length,
      },
      'Processing related data',
    );

    this.logger.debug(`Deleting existing course structures`);
    await this.repository.deleteCourseStructures(id);
    
    this.logger.debug(`Inserting new course structures`);
    if (input.courseStructures.length) {
      await this.repository.createCourseStructures(
        input.courseStructures.map((it) => ({
          title: it.title,
          competencies: it.competencies,
          learningHours: it.learningHours,
          deliveryFormats: it.formats,
          curriculumId: id,
        })),
      );
    }

    this.logger.debug(`Deleting existing learning outcomes`);
    await this.repository.deleteLearningOutcomes(id);
    
    this.logger.debug(`Inserting new learning outcomes`);
    if (input.learningOutcomes.length) {
      await this.repository.createLearningOutcomes(
        input.learningOutcomes.map((it) => ({
          outcome: it.learningOutcome,
          teachingStrategy: it.teachingStrategy,
          assessmentStrategy: it.assessmentStrategy,
          curriculumId: id,
        })),
      );
    }
    return resp;
  }

  async handleRequestSubmit(id: string, requestedBy: string) {
    this.logger.info({ requestedBy, id }, `Starting ${this.handleRequestSubmit.name}`);

    const prev = await this.findOne(id);
    if (!prev) {
      return await this.repository.create({ requestedBy, id, content: '' });
    }

    // Apply Domain Logic
    const result = CurriculumDomain.handleReissue(prev as any, requestedBy);
    if (result.shouldUpdateToDraft) {
      return await this.repository.update(id, { status: 'DRAFT' });
    }
  }

  async submitGeneralInfo(id: string, requestedBy: string, input: CurriculumReqGeneralSubmitInput) {
    this.logger.info({ requestedBy, id }, `Starting ${this.submitGeneralInfo.name}`);

    await this.handleRequestSubmit(id, requestedBy);
    const [resp] = await this.db
      .select(getTableColumns(schema.curriculumGeneralInfo))
      .from(schema.curriculumGeneralInfo)
      .where(eq(schema.curriculumGeneralInfo.id, id));
    const prevGeneralInfo = resp?.generalInfo as CurriculumReqGeneralSubmitInput['general'] | undefined;
    
    input.general.attributes = input.general?.attributes?.length
      ? await Promise.all(
          input.general.attributes?.map(async (att) => {
            if (prevGeneralInfo?.attributes?.includes(att)) return att;
            const targetPath = this.storage.getMovePath(att, 'general');
            await this.storage.moveObject(att, targetPath);
            await this.storage.setHoldObject(targetPath);
            return targetPath;
          }),
        )
      : [];

    if (prevGeneralInfo?.attributes?.length) {
      await Promise.all(
        prevGeneralInfo.attributes?.map(async (att) => {
          if (input.general.attributes && !input.general.attributes.includes(att)) {
            await this.storage.unsetHoldObject(att);
          }
        }),
      );
    }

    if (resp) {
      const [updated] = await this.db
        .update(schema.curriculumGeneralInfo)
        .set({
          generalInfo: input.general,
          model: input.model ?? '',
          type: input.type ?? '',
          benefits: input.benefits ?? [],
        })
        .where(eq(schema.curriculumGeneralInfo.id, id))
        .returning();
      return updated;
    } else {
      const [created] = await this.db.insert(schema.curriculumGeneralInfo).values({
        id,
        generalInfo: input.general,
        benefits: input.benefits,
        model: input.model ?? '',
        type: input.type ?? '',
      });
      return created;
    }
  }

  async submitBudgetInfo(id: string, requestedBy: string, input: CurriculumReqBudgetSubmitInput) {
    this.logger.info({ requestedBy, id, input }, `Starting ${this.submitBudgetInfo.name}`);

    await this.handleRequestSubmit(id, requestedBy);

    let resp = await this.db.query.curriculumApplications.findFirst({
      where: eq(schema.curriculumApplications.id, id),
    });

    let targetPath: string | undefined;
    if (input.attachFile) {
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
      resp = updated as any;
    } else {
      const [created] = await this.db.insert(schema.curriculumApplications).values({
        id,
        minimumEnrollment: input.minimumRegister,
        courseFee: input.fee,
        qualificationRequirements: input.applicantQualifications,
        additionalConditions: input.applicantQualificationConditions,
        attachmentUrl: targetPath,
      });
      resp = created as any;
    }

    if (input.attachFile && targetPath) {
      await this.storage.moveObject(input.attachFile, targetPath);
      await this.storage.setHoldObject(targetPath);
    }

    return resp;
  }

  async submitApprovalAction(curriculumId: string, approvedBy: string, input: SubmitCourseImplementationInput) {
    this.logger.info({ approvedBy, curriculumId, input }, `Starting ${this.submitApprovalAction.name}`);
    
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
