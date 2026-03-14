import { boolean, pgEnum, pgTable, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';

export const EnumRoleType = pgEnum('authentication_role_type', ['STUDENT', 'PERSONNEL', 'ADMIN']);

// Accounts Table
export const identities = pgTable('identities', {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  status: varchar({ enum: ['active', 'inactive'] })
    .notNull()
    .default('active'),
  systemUrls: varchar({ length: 255 }).array().notNull().default([]),
});

// Roles Table
export const roles = pgTable('roles', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).unique().notNull(),
  type: EnumRoleType().notNull(),
  description: varchar({ length: 255 }),
});

// Permissions Table
export const permissions = pgTable('permissions', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).unique().notNull(),
  description: varchar({ length: 255 }),
});

// Systems Table
export const systems = pgTable('systems', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).unique().notNull(),
  url: varchar({ length: 255 }).unique().notNull(),
  note: varchar({ length: 255 }),
  loginRequired: boolean().default(false).notNull(),
  active: boolean().default(true).notNull(),
});

// Junction Tables for Many-to-Many Relationships
export const identityRoles = pgTable(
  'identities_roles',
  {
    identityId: uuid()
      .references(() => identities.id)
      .notNull(),
    roleId: uuid()
      .references(() => roles.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.identityId, table.roleId] })],
);

export const rolePermissions = pgTable(
  'roles_permissions',
  {
    roleId: uuid()
      .references(() => roles.id)
      .notNull(),
    permissionId: uuid()
      .references(() => permissions.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const permissionSystems = pgTable(
  'permissions_systems',
  {
    permissionId: uuid()
      .references(() => permissions.id)
      .notNull(),
    systemId: uuid()
      .references(() => systems.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.permissionId, table.systemId] })],
);
