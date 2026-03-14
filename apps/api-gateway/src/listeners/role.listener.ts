import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { RolePermissionsAssigned } from 'src/events/role.event';
import { syncSystemUrls } from './utils';

@Injectable()
export class RoleListener {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(RoleListener.name);
  }
  @OnEvent(RolePermissionsAssigned.name)
  async handleRolePermissionsAssignedEvent(event: RolePermissionsAssigned) {
    this.logger.info({ event }, `Received ${RolePermissionsAssigned.name} event`);

    try {
      const identities = await this.db
        .selectDistinct({ id: schema.identityRoles.identityId })
        .from(schema.identityRoles)
        .where(eq(schema.identityRoles.roleId, event.payload.roleId));

      for (const { id } of identities) {
        await syncSystemUrls(this.db, id);
      }

      this.logger.info(
        { processed: identities },
        `Successfully processed ${identities.length} ${RolePermissionsAssigned.name} event`,
      );
    } catch (error) {
      this.logger.error(error, `Failed to process ${RolePermissionsAssigned.name} event`);
    }
  }
}
