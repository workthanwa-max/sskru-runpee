import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eq, getTableColumns } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { CurriculumReqGeneralSubmitInput } from '../dto/curriculum.dto';
import { CurriculumService } from './curriculum.service';
import { FileStorageService } from 'src/common/storage/file-storage.service';

// Curriculum Service
@Injectable()
export class CurriculumGeneralService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly curriculumService: CurriculumService,
    private readonly storage: FileStorageService,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CurriculumGeneralService.name);
  }

  async submit(id: string, requestedBy: string, input: CurriculumReqGeneralSubmitInput) {
    this.logger.info({ requestedBy, id }, `Starting ${this.submit.name}`);

    await this.curriculumService.handleRequestSubmit(id, requestedBy);
    const [resp] = await this.db
      .select(getTableColumns(schema.curriculumGeneralInfo))
      .from(schema.curriculumGeneralInfo)
      .where(eq(schema.curriculumGeneralInfo.id, id));
    const prevGeneralInfo = resp?.generalInfo as CurriculumReqGeneralSubmitInput['general'] | undefined;
    input.general.attributes = input.general?.attributes?.length
      ? await Promise.all(
          input.general.attributes?.map(async (att) => {
            if (prevGeneralInfo?.attributes?.includes(att)) {
              return att;
            }
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
      const [resp] = await this.db
        .update(schema.curriculumGeneralInfo)
        .set({
          generalInfo: input.general,
          model: input.model ?? '',
          type: input.type ?? '',
          benefits: input.benefits ?? [],
        })
        .where(eq(schema.curriculumGeneralInfo.id, id))
        .returning();
      return resp;
    } else {
      const [resp] = await this.db.insert(schema.curriculumGeneralInfo).values({
        id,
        generalInfo: input.general,
        benefits: input.benefits,
        model: input.model ?? '',
        type: input.type ?? '',
      });
      return resp;
    }
  }
}
