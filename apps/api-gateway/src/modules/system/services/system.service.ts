import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, InsertSystem, schema } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';

@Injectable()
export class SystemService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private db: DBClientType,
  ) {}

  async create(newSystem: InsertSystem) {
    const system = await this.db.insert(schema.systems).values(newSystem).returning();
    return system[0];
  }

  async findAll() {
    return this.db.query.systems.findMany();
  }

  async findOne(id: string) {
    const system = await this.db.query.systems.findFirst({
      where: eq(schema.systems.id, id),
    });
    if (!system) {
      throw new NotFoundError(`System with ID ${id} not found`);
    }
    return system;
  }

  async update(id: string, updatedSystem: Partial<InsertSystem>) {
    const system = await this.db.update(schema.systems).set(updatedSystem).where(eq(schema.systems.id, id)).returning();
    if (!system[0]) {
      throw new NotFoundError(`System with ID ${id} not found`);
    }
    return system[0];
  }

  async remove(id: string) {
    const system = await this.db.delete(schema.systems).where(eq(schema.systems.id, id)).returning();
    if (!system[0]) {
      throw new NotFoundError(`System with ID ${id} not found`);
    }
    return system[0];
  }
}
