import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { Database, schema } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { CreateStudentInput, UpdateStudentInput } from '../dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: Database,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(StudentService.name);
  }

  async create(input: CreateStudentInput) {
    this.logger.info(input, `Starting ${this.create.name}`);
    const [student] = await this.db.insert(schema.students).values(input).returning();
    return student;
  }

  async findAll() {
    return this.db.query.students.findMany();
  }

  async findOne(id: string) {
    const student = await this.db.query.students.findFirst({
      where: eq(schema.students.id, id),
    });
    if (!student) {
      throw new NotFoundError(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: string, input: UpdateStudentInput) {
    const student = await this.db.update(schema.students).set(input).where(eq(schema.students.id, id)).returning();
    if (!student[0]) {
      throw new NotFoundError(`Student with ID ${id} not found`);
    }
    return student[0];
  }

  async remove(id: string) {
    const student = await this.db.delete(schema.students).where(eq(schema.students.id, id)).returning();
    if (!student[0]) {
      throw new NotFoundError(`Student with ID ${id} not found`);
    }
    return student[0];
  }
}
