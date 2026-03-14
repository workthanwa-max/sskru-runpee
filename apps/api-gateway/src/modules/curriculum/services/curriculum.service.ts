import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PinoLogger } from 'nestjs-pino';
import type { Curriculum } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { RequestSubmitted } from 'src/events/curriculum.event';
import { CurriculumReqCurriculumSubmitInput } from '../dto/curriculum.dto';
import { CurriculumRepository } from 'src/repositories/curriculum.repository';
import { CurriculumDomain } from 'src/domain/curriculum.domain';

// Curriculum Service
@Injectable()
export class CurriculumService {
  constructor(
    private readonly repository: CurriculumRepository,
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
}
