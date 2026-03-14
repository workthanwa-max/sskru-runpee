import { Inject, Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { hash } from 'argon2';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { PersonnelCreated } from 'src/events/personnel.event';
import { syncSystemUrls } from './utils';

@Injectable()
export class PersonnelListener {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(PersonnelListener.name);
  }

  @OnEvent(PersonnelCreated.name)
  async handlePersonnelCreated(event: PersonnelCreated) {
    this.logger.info({ event }, `Received ${PersonnelCreated.name} event`);
    try {
      let identity = await this.db.query.identities.findFirst({ where: eq(schema.identities.id, event.payload.id) });
      
      if (!identity) {
        const [res] = await this.db
          .insert(schema.identities)
          .values({
            id: event.payload.id,
            username: event.payload.personnelId,
            password: await hash(event.payload.personnelId),
          })
          .returning();
        identity = res;

        // Assign STUDENT role by default for new registrations
        const studentRole = await this.db.query.roles.findFirst({
          where: eq(schema.roles.type, 'STUDENT'),
        });

        if (studentRole) {
          await this.db.insert(schema.identityRoles).values({
            identityId: identity.id,
            roleId: studentRole.id,
          });
          
          await syncSystemUrls(this.db, identity.id);
        }
      }
      this.logger.info({ processed: identity }, `Successfully processed ${PersonnelCreated.name} event`);
    } catch (error) {
      this.logger.error(error, `Failed to process ${PersonnelCreated.name} event`);
    }
  }
}
