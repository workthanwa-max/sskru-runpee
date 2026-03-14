import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: uuid().primaryKey().defaultRandom(),
  studentId: varchar({ length: 255 }).notNull().unique(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  facultyId: uuid(),
  program: varchar({ length: 255 }),
  year: integer(),
});
