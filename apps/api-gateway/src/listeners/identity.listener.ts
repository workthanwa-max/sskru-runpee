import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType } from 'src/common/drizzle';
import { IdentityRolesAssigned } from 'src/events/identity.event';
import { PermissionSystemsAssigned } from 'src/events/permission.event';
import { syncSystemUrls } from './utils';

@Injectable()
export class IdentityListener {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(IdentityListener.name);
  }
  @OnEvent(IdentityRolesAssigned.name)
  async handleIdentityRolesAssigned(event: IdentityRolesAssigned) {
    this.logger.info({ event }, `Received ${IdentityRolesAssigned.name} event`);

    try {
      await syncSystemUrls(this.db, event.payload.identityId);
      this.logger.info(
        { processed: event.payload.identityId },
        `Successfully processed ${PermissionSystemsAssigned.name} event`,
      );
    } catch (error) {
      this.logger.error(error, `Failed to process ${PermissionSystemsAssigned.name} event`);
    }
  }
}
