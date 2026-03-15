import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { Database, schema } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { PersonnelCreated } from 'src/events/personnel.event';
import { CreatePersonnelInput, UpdatePersonnelInput } from '../dto/personnel.dto';
import { FileStorageService } from 'src/common/storage/file-storage.service';

@Injectable()
export class PersonnelService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: Database,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
    private readonly storage: FileStorageService,
  ) {
    logger.setContext(PersonnelService.name);
  }

  async create(input: CreatePersonnelInput) {
    this.logger.info(input, `Starting ${this.create.name}`);

    const [personnel] = await this.db.insert(schema.personnel).values(input).returning();

    this.emitter.emit(PersonnelCreated.name, new PersonnelCreated(personnel));

    return personnel;
  }

  async findAll() {
    return this.db.query.personnel.findMany();
  }

  async findOne(id: string) {
    const personnel = await this.db.query.personnel.findFirst({
      where: eq(schema.personnel.id, id),
    });
    if (!personnel) {
      throw new NotFoundError(`Personnel with ID ${id} not found`);
    }
    return personnel;
  }

  async update(id: string, input: UpdatePersonnelInput) {
    const personnel = await this.db.update(schema.personnel).set(input).where(eq(schema.personnel.id, id)).returning();
    if (!personnel[0]) {
      throw new NotFoundError(`Personnel with ID ${id} not found`);
    }
    return personnel[0];
  }

  async remove(id: string) {
    const personnel = await this.db.delete(schema.personnel).where(eq(schema.personnel.id, id)).returning();
    if (!personnel[0]) {
      throw new NotFoundError(`Personnel with ID ${id} not found`);
    }
    return personnel[0];
  }

  async importPersonnel(gsPath: string) {
    // Logic for importing Excel file from gsPath
    // ...
    return { id: 'import-job-id' };
  }

  async getPersonnelUploadURL(filePath: string, contentType: string) {
    const result = await this.storage.getSignedUrl(filePath, contentType);
    return {
      gsPath: result.gsPath,
      uploadURL: result.signedUrl,
    };
  }

  async assignRoles(identityId: string, roleIds: string[]) {
    this.logger.info({ identityId, roleIds }, `Starting ${this.assignRoles.name}`);

    await this.db.transaction(async (tx) => {
      // Delete existing roles for this identity
      await tx.delete(schema.identityRoles).where(eq(schema.identityRoles.identityId, identityId));

      // Insert new roles
      if (roleIds.length > 0) {
        await tx.insert(schema.identityRoles).values(
          roleIds.map((roleId) => ({
            identityId,
            roleId,
          })),
        );
      }
    });

    return { success: true };
  }
}
