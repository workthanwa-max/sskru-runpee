import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const faculties = pgTable('faculties', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  shortName: varchar({ length: 50 }),
  parentId: uuid().references(() => faculties.id),
  description: varchar({ length: 255 }),
});
