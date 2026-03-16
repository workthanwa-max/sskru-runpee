import { Inject, Injectable } from '@nestjs/common';
import { and, eq, getTableColumns, not, SQLWrapper } from 'drizzle-orm';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import type { Curriculum } from 'src/common/drizzle';

@Injectable()
export class CurriculumRepository {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private db: DBClientType,
  ) {}

  async findAll(filters?: Partial<Curriculum>) {
    const conditions: SQLWrapper[] = [];
    if (filters) {
      Object.keys(filters).map((key) => {
        if (filters[key]) {
          conditions.push(eq(schema.curriculums[key], filters[key]));
        }
      });
    }

    return this.db.query.curriculums.findMany({
      where: conditions.length ? (_curriculum, { and }) => and(...conditions) : undefined,
    });
  }

  async findReviewing() {
    return this.db.query.curriculums.findMany({
      where: not(eq(schema.curriculums.status, 'DRAFT')),
    });
  }

  async findOne(id: string) {
    return this.db.query.curriculums.findFirst({
      where: eq(schema.curriculums.id, id),
    });
  }

  async findGeneralInfo(curriculumId: string) {
    return this.db.query.curriculumGeneralInfo.findFirst({
      where: eq(schema.curriculumGeneralInfo.id, curriculumId),
    });
  }

  async findActivities(curriculumId: string) {
    return this.db.query.approvalActions.findMany({
      where: eq(schema.approvalActions.curriculumId, curriculumId),
    });
  }

  async findApplications(curriculumId: string) {
    return this.db.query.curriculumApplications.findFirst({
      where: eq(schema.curriculumApplications.id, curriculumId),
    });
  }

  async findApplicationBudgetEstimates(curriculumId: string) {
    return this.db.query.budgetEstimates.findMany({
      where: eq(schema.budgetEstimates.curriculumId, curriculumId),
    });
  }

  async findCourseStructures(curriculumId: string) {
    return this.db.query.courseStructures.findMany({
      where: eq(schema.courseStructures.curriculumId, curriculumId),
    });
  }

  async findLearningOutcomes(curriculumId: string) {
    return this.db.query.learningOutcomes.findMany({
      where: eq(schema.learningOutcomes.curriculumId, curriculumId),
    });
  }

  async update(id: string, data: Partial<Curriculum>) {
    const result = await this.db
      .update(schema.curriculums)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.curriculums.id, id))
      .returning();
    return result[0];
  }

  async create(data: Partial<Curriculum>) {
    const result = await this.db
        .insert(schema.curriculums)
        .values(data as any)
        .returning();
    return result[0];
  }

  async delete(id: string) {
    const result = await this.db.delete(schema.curriculums).where(eq(schema.curriculums.id, id)).returning();
    return result[0];
  }

  async deleteCourseStructures(curriculumId: string) {
    await this.db.delete(schema.courseStructures).where(eq(schema.courseStructures.curriculumId, curriculumId));
  }

  async createCourseStructures(structures: any[]) {
    if (structures.length > 0) {
      await this.db.insert(schema.courseStructures).values(structures);
    }
  }

  async deleteLearningOutcomes(curriculumId: string) {
    await this.db.delete(schema.learningOutcomes).where(eq(schema.learningOutcomes.curriculumId, curriculumId));
  }

  async createLearningOutcomes(outcomes: any[]) {
    if (outcomes.length > 0) {
      await this.db.insert(schema.learningOutcomes).values(outcomes);
    }
  }

  async getCurriculumWithColumns(id: string) {
    const result = await this.db
      .select(getTableColumns(schema.curriculums))
      .from(schema.curriculums)
      .where(eq(schema.curriculums.id, id));
    return result[0];
  }

  async checkCanSubmit(curriculumId: string) {
    const result = await this.db
      .select({ id: schema.curriculums.id })
      .from(schema.curriculums)
      .innerJoin(schema.curriculumGeneralInfo, eq(schema.curriculumGeneralInfo.id, curriculumId))
      .where(eq(schema.curriculums.id, curriculumId));
    return result[0];
  }
}
