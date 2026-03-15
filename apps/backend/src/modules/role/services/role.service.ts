import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { PinoLogger } from 'nestjs-pino';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, schema } from 'src/common/drizzle';
import { NotFoundError } from 'src/common/errors';
import { RolePermissionsAssigned } from 'src/events/role.event';
import { RolePermissionInput, CreateRoleInput } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(RoleService.name);
  }

  async findAll(identityId?: string) {
    if (identityId) {
      return this.db
        .select(getTableColumns(schema.roles))
        .from(schema.roles)
        .innerJoin(schema.identityRoles, eq(schema.roles.id, schema.identityRoles.roleId))
        .where(eq(schema.identityRoles.identityId, identityId));
    }
    return this.db.query.roles.findMany();
  }

  async findOne(id: string) {
    const role = await this.db.query.roles.findFirst({
      where: eq(schema.roles.id, id),
    });
    if (!role) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return role;
  }

  async create(input: CreateRoleInput) {
    const role = await this.db.insert(schema.roles).values(input).returning();
    return role[0];
  }

  async update(id: string, input: CreateRoleInput) {
    const role = await this.db.update(schema.roles).set(input).where(eq(schema.roles.id, id)).returning();
    if (!role[0]) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return role[0];
  }

  async assignRolePermissions(input: RolePermissionInput) {
    this.logger.info(input, `Starting ${this.assignRolePermissions.name}`);
    await this.db.delete(schema.rolePermissions).where(eq(schema.rolePermissions.roleId, input.roleId));

    if (input.permissionIds.length) {
      await this.db.insert(schema.rolePermissions).values(
        input.permissionIds.map((permissionId) => ({
          roleId: input.roleId,
          permissionId,
        })),
      );
    }

    this.emitter.emit(RolePermissionsAssigned.name, new RolePermissionsAssigned(input));
  }

  async findPermissionsByRoleId(roleId: string) {
    return await this.db
      .selectDistinct({
        id: schema.permissions.id,
        name: schema.permissions.name,
        description: schema.permissions.description,
      })
      .from(schema.permissions)
      .innerJoin(
        schema.rolePermissions,
        and(eq(schema.rolePermissions.permissionId, schema.permissions.id), eq(schema.rolePermissions.roleId, roleId)),
      );
  }
}
