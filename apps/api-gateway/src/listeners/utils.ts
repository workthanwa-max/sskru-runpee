import { eq } from 'drizzle-orm';
import { DBClientType, schema } from 'src/common/drizzle';

export async function syncSystemUrls(db: DBClientType, identityId: string): Promise<void> {
  const systemUrlsQuery = await db
    .select({ url: schema.systems.url })
    .from(schema.identities)
    .innerJoin(schema.identityRoles, eq(schema.identities.id, schema.identityRoles.identityId))
    .innerJoin(schema.roles, eq(schema.identityRoles.roleId, schema.roles.id))
    .innerJoin(schema.rolePermissions, eq(schema.roles.id, schema.rolePermissions.roleId))
    .innerJoin(schema.permissions, eq(schema.rolePermissions.permissionId, schema.permissions.id))
    .innerJoin(schema.permissionSystems, eq(schema.permissions.id, schema.permissionSystems.permissionId))
    .innerJoin(schema.systems, eq(schema.permissionSystems.systemId, schema.systems.id))
    .where(eq(schema.identities.id, identityId));

  const uniqueSystemUrls = [...new Set(systemUrlsQuery.map((row) => row.url))];
  if (uniqueSystemUrls.length) {
    await db
      .update(schema.identities)
      .set({ systemUrls: uniqueSystemUrls })
      .where(eq(schema.identities.id, identityId));
  }
}
