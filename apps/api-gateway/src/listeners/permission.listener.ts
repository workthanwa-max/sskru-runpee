import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { PermissionSystemsAssigned } from 'src/events/permission.event';
import { syncSystemUrls } from './utils';

@Injectable()
export class PermissionListener {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(PermissionListener.name);
  }
  @OnEvent(PermissionSystemsAssigned.name)
  async handlePermissionSystemsAssignedEvent(event: PermissionSystemsAssigned) {
    this.logger.info({ event }, `Received ${PermissionSystemsAssigned.name} event`);

    try {
      const identities = await this.db
        .selectDistinct({ id: schema.identities.id })
        .from(schema.identities)
        .innerJoin(schema.identityRoles, eq(schema.identities.id, schema.identityRoles.identityId))
        .innerJoin(schema.rolePermissions, eq(schema.rolePermissions.roleId, schema.identityRoles.roleId))
        .where(eq(schema.rolePermissions.permissionId, event.payload.permissionId));

      for (const { id } of identities) {
        await syncSystemUrls(this.db, id);
      }

      this.logger.info(
        { processed: identities },
        `Successfully processed ${identities.length} ${PermissionSystemsAssigned.name} event`,
      );
    } catch (error) {
      this.logger.error(error, `Failed to process ${PermissionSystemsAssigned.name} event`);
    }
  }
}
