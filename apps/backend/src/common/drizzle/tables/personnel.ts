import { date, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const personnel = pgTable('personnel', {
  id: uuid().primaryKey().defaultRandom(),
  personnelId: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  academicPosition: varchar({ length: 255 }), // Optional academic position
  highestEducation: varchar({ length: 255 }).notNull(),
  programOrField: varchar({ length: 255 }).notNull(),
  university: varchar({ length: 255 }).notNull(),
  graduationYear: integer().notNull(),
  facultyIds: uuid().array().default([]), // Foreign key faculty table in Faculty DB
});

export const importProgress = pgTable('import_progress', {
  id: varchar({ length: 255 }).primaryKey(),
  label: varchar({ length: 255 }).notNull(),
  total: integer().notNull(),
  processed: integer().default(0),
  createdAt: date().defaultNow().notNull(),
  updatedAt: date(),
});

// Education Table
export const educations = pgTable('personnel_educations', {
  id: uuid().primaryKey().defaultRandom(),
  personnelId: uuid()
    .references(() => personnel.id)
    .notNull(), // Foreign key
  degree: varchar({ length: 255 }).notNull(),
  field: varchar({ length: 255 }).notNull(),
  university: varchar({ length: 255 }).notNull(),
  year: integer().notNull(),
});
