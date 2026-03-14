import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, Faculty, schema } from 'src/common/drizzle';
import { CreateFacultyInput } from '../dto/faculty.dto';

@Injectable()
export class FacultyService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
  ) {}

  async create(newFaculty: CreateFacultyInput) {
    const [faculty] = await this.db.insert(schema.faculties).values(newFaculty).returning();
    return faculty;
  }

  async findAll() {
    return this.db.query.faculties.findMany();
  }

  async findOne(id: string): Promise<Faculty> {
    const faculty = await this.db.query.faculties.findFirst({
      where: eq(schema.faculties.id, id),
    });
    return faculty;
  }

  async findChildren(parentId: string) {
    return this.db.query.faculties.findMany({
      where: eq(schema.faculties.parentId, parentId),
    });
  }
}
