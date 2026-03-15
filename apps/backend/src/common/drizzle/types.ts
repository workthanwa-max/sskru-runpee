export { Config as DrizzleConfig } from 'drizzle-kit';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { dbClient } from './client';
import * as schema from './tables';
export type Database = LibSQLDatabase<typeof schema>;
export type DBClientType = typeof dbClient;

export type System = typeof schema.systems.$inferSelect;
export type Identity = typeof schema.identities.$inferSelect;
export type Permission = typeof schema.permissions.$inferSelect;
export type Role = typeof schema.roles.$inferSelect;
export type Personnel = typeof schema.personnel.$inferSelect;
export type Faculty = typeof schema.faculties.$inferSelect;
export type Curriculum = typeof schema.curriculums.$inferSelect;
export type ApprovalActions = typeof schema.approvalActions.$inferSelect;

export type InsertSystem = typeof schema.systems.$inferInsert;
export type InsertIdentity = typeof schema.identities.$inferInsert;
