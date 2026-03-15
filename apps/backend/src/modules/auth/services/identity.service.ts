import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { hash, verify } from 'argon2';
import { eq, getTableColumns, inArray } from 'drizzle-orm';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { Identity, RoleType } from 'src/auth/types/auth.type';
import { refs } from 'src/common/consts/refs.const';
import { DBClientType, InsertIdentity, schema } from 'src/common/drizzle';
import { BadRequestError, NotFoundError } from 'src/common/errors';
import { IdentityRolesAssigned } from 'src/events/identity.event';
import { AssignIdentityRoleInput, LoginInput, RegisterInput } from '../dto/auth.dto';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(refs.DRIZZLE_CLIENT)
    private readonly db: DBClientType,
    private readonly jwtService: JwtService,
    private readonly emitter: EventEmitter2,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(IdentityService.name);
  }

  async findOne(id: string) {
    const identity = await this.db.query.identities.findFirst({
      where: eq(schema.identities.id, id),
    });
    if (!identity) {
      throw new NotFoundError(`Identity with ID ${id} not found`);
    }
    return identity;
  }

  async login(input: LoginInput) {
    const [identity] = await this.db
      .select()
      .from(schema.identities)
      .where(eq(schema.identities.username, input.username));

    if (!identity?.password || !(await verify(identity.password, input.password))) {
      throw new BadRequestError(`Username or password incorrect`);
    }

    const roles = await this.db
      .selectDistinct(getTableColumns(schema.roles))
      .from(schema.roles)
      .innerJoin(schema.identityRoles, eq(schema.identityRoles.roleId, schema.roles.id))
      .where(eq(schema.identityRoles.identityId, identity.id));

    const payload: Identity = {
      id: identity.id,
      username: identity.username,
      roles: roles.map((r) => r.type) as RoleType[],
      systemUrls: identity.systemUrls,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      identity,
    };
  }

  async register(input: RegisterInput) {
    // Check if personnelId already registered
    const existing = await this.db.query.identities.findFirst({
      where: eq(schema.identities.username, input.personnelId),
    });
    if (existing) {
      throw new BadRequestError('มีบัญชีนี้อยู่แล้ว กรุณาเข้าสู่ระบบ');
    }

    const hashedPassword = await hash(input.password);

    return await this.db.transaction(async (tx) => {
      // Create personnel record
      const [personnel] = await tx
        .insert(schema.personnel)
        .values({
          personnelId: input.personnelId,
          firstname: input.firstname,
          lastname: input.lastname,
          phone: input.phone,
          highestEducation: '',
          university: '',
          graduationYear: 0,
          programOrField: '',
        })
        .returning();

      // Create identity with personnelId as username and user-chosen password
      const [identity] = await tx
        .insert(schema.identities)
        .values({
          id: personnel.id,
          username: input.personnelId,
          password: hashedPassword,
        })
        .returning();

      // Assign STUDENT role
      const studentRole = await tx.query.roles.findFirst({
        where: eq(schema.roles.type, 'STUDENT'),
      });
      if (studentRole) {
        await tx.insert(schema.identityRoles).values({
          identityId: identity.id,
          roleId: studentRole.id,
        });
      }

      return { success: true, identity };
    });
  }

  async assignIdentityRoles(input: AssignIdentityRoleInput) {
    this.logger.info(input, `Starting ${this.assignIdentityRoles.name}`);

    await this.db.delete(schema.identityRoles).where(eq(schema.identityRoles.identityId, input.identityId));
    if (input.roleIds.length) {
      await this.db
        .insert(schema.identityRoles)
        .values(input.roleIds.map((roleId) => ({ identityId: input.identityId, roleId })))
        .returning();
    }

    this.emitter.emit(IdentityRolesAssigned.name, new IdentityRolesAssigned(input));
  }

  async update(id: string, updatedIdentity: Partial<InsertIdentity>) {
    const identity = await this.db
      .update(schema.identities)
      .set(updatedIdentity)
      .where(eq(schema.identities.id, id))
      .returning();
    if (!identity[0]) {
      throw new NotFoundError(`Identity with ID ${id} not found`);
    }
    return identity[0];
  }

  async remove(id: string) {
    const identity = await this.db.delete(schema.identities).where(eq(schema.identities.id, id)).returning();
    if (!identity[0]) {
      throw new NotFoundError(`Identity with ID ${id} not found`);
    }
    return identity[0];
  }

  async findSystemsByIdentityId(identityId: string) {
    return await this.db
      .selectDistinct({ ...getTableColumns(schema.systems) })
      .from(schema.systems)
      .innerJoin(schema.identities, inArray(schema.systems.url, schema.identities.systemUrls))
      .where(eq(schema.identities.id, identityId));
  }
}
