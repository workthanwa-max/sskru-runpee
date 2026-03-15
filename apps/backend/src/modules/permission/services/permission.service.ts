import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { PermissionSystemsAssigned } from 'src/events/permission.event';
import {
    CreatePermissionInput,
    PermissionSystemInput,
    UpdatePermissionInput,
} from '../dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(PermissionService.name);
  }

  async findAll() {
    const permissions = await this.db.query.permissions.findMany({});
    return permissions;
  }

  async findSystems(permissionId: string) {
    const resp = await this.db
      .selectDistinct(getTableColumns(schema.systems))
      .from(schema.systems)
      .innerJoin(
        schema.permissionSystems,
        and(
          eq(schema.permissionSystems.systemId, schema.systems.id),
          eq(schema.permissionSystems.permissionId, permissionId),
        ),
      );
    return resp;
  }

  async findOne(id: string) {
    const permission = await this.db.query.permissions.findFirst({
      where: eq(schema.permissions.id, id),
    });
    if (!permission) {
      throw new NotFoundError(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async assignPermissionSystems(input: PermissionSystemInput) {
    this.logger.info(input, `Starting ${this.assignPermissionSystems.name}`);

    await this.db.delete(schema.permissionSystems).where(eq(schema.permissionSystems.permissionId, input.permissionId));
    if (input.systemIds.length) {
      await this.db
        .insert(schema.permissionSystems)
        .values(input.systemIds.map((systemId) => ({ permissionId: input.permissionId, systemId })))
        .returning();
    }

    this.emitter.emit(PermissionSystemsAssigned.name, new PermissionSystemsAssigned(input));
  }

  async create(input: CreatePermissionInput) {
    const [permission] = await this.db.insert(schema.permissions).values(input).returning();
    return permission;
  }

  async update(id: string, input: UpdatePermissionInput) {
    const permission = await this.db
      .update(schema.permissions)
      .set(input)
      .where(eq(schema.permissions.id, id))
      .returning();
    if (!permission[0]) {
      throw new NotFoundError(`Permission with ID ${id} not found`);
    }
    return permission[0];
  }

  async remove(id: string) {
    const permission = await this.db.delete(schema.permissions).where(eq(schema.permissions.id, id)).returning();
    if (!permission[0]) {
      throw new NotFoundError(`Permission with ID ${id} not found`);
    }
    return permission[0];
  }

  async findPermissionsByRoleId(roleId: string) {
    return await this.db
      .selectDistinct({ ...getTableColumns(schema.permissions) })
      .from(schema.permissions)
      .innerJoin(
        schema.rolePermissions,
        and(eq(schema.rolePermissions.permissionId, schema.permissions.id), eq(schema.rolePermissions.roleId, roleId)),
      );
  }
}
