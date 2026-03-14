import { boolean, date, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Enums
export const EnumCourseType = pgEnum('curriculum_course_type', ['NON_DEGREE', 'DEGREE']);
export const EnumExpenseCategory = pgEnum('curriculum_expense_category', ['COMPENSATION', 'EXPENSES', 'MATERIAL']);
export const EnumApprovalStepEnum = pgEnum('curriculum_approval_step', [
  'UNDER_CONSIDERATION', // 1 - อยู่ระหว่างการพิจารณา
  'ACADEMIC_COMMITTEE', // 2 - คณะกรรมการวิชาการ
  'ACADEMIC_COUNCIL', // 3 - สภาวิชาการ
  'UNIVERSITY_COUNCIL', // 4 - สภามหาวิทยาลัย
  'APPROVED', // 5 - อนุมัติแล้ว
]);
export const EnumStatus = pgEnum('curriculum_status', ['DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'REJECTED', 'APPROVED']);

// หลักสูตร (Curriculum)
export const curriculums = pgTable('curriculums', {
  id: uuid().primaryKey().defaultRandom(),
  objectives: varchar({ length: 255 }).array().default([]), // วัตถุประสงค์
  content: varchar({ length: 255 }).notNull(), // เนื้อหา
  requestedBy: varchar({ length: 255 }).notNull(), // ผู้ยื่นคำขอ
  status: EnumStatus().default('DRAFT'), // สถานะ
  currentStep: EnumApprovalStepEnum(), // ขั้นตอนปัจจุบัน
  rejectionNote: varchar({ length: 255 }), // หมายเหตุการไม่อนุมัติ
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// ข้อมูลทั่วไปของหลักสูตร
export const curriculumGeneralInfo = pgTable('curriculum_general_info', {
  id: uuid()
    .primaryKey()
    .references(() => curriculums.id),
  generalInfo: jsonb().notNull(), // ข้อมูลทั่วไป
  model: varchar({ length: 255 }).notNull(), // รูปแบบ
  type: varchar({ length: 255 }).notNull(), // ประเภท
  benefits: varchar({ length: 255 }).array().default([]), // ประโยชน์ที่ได้รับ
});

// การสมัครเรียน
export const curriculumApplications = pgTable('curriculum_applications', {
  id: uuid()
    .primaryKey()
    .references(() => curriculums.id),
  minimumEnrollment: integer().notNull(), // จำนวนผู้สมัครขั้นต่ำ
  courseFee: integer().default(0).notNull(), // ค่าธรรมเนียม
  qualificationRequirements: varchar({ length: 255 }).array().default([]), // คุณสมบัติผู้สมัคร
  additionalConditions: varchar({ length: 255 }).array().default([]), // เงื่อนไขเพิ่มเติม
  attachmentUrl: varchar({ length: 255 }), // ไฟล์แนบ
});

// โครงสร้างรายวิชา
export const courseStructures = pgTable('course_structures', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(), // ชื่อรายวิชา
  competencies: varchar({ length: 255 }).notNull(), // สมรรถนะ
  learningHours: jsonb().notNull(), // จำนวนชั่วโมงเรียน
  deliveryFormats: varchar({ length: 255 }).array().default([]), // รูปแบบการจัดการเรียนการสอน
  curriculumId: uuid()
    .references(() => curriculums.id)
    .notNull(),
});

// ผลลัพธ์การเรียนรู้
export const learningOutcomes = pgTable('learning_outcomes', {
  id: uuid().primaryKey().defaultRandom(),
  outcome: varchar({ length: 255 }).notNull(), // ผลลัพธ์การเรียนรู้
  teachingStrategy: varchar({ length: 255 }).notNull(), // กลยุทธ์การสอน
  assessmentStrategy: varchar({ length: 255 }).notNull(), // กลยุทธ์การประเมิน
  curriculumId: uuid()
    .references(() => curriculums.id)
    .notNull(),
});

// ประมาณการค่าใช้จ่าย
export const budgetEstimates = pgTable('budget_estimates', {
  id: uuid().primaryKey().defaultRandom(),
  category: EnumExpenseCategory().notNull(), // หมวดหมู่
  itemName: varchar({ length: 255 }).notNull(), // รายการ
  estimatedCost: integer().notNull(), // ค่าใช้จ่ายประมาณการ
  curriculumId: uuid()
    .references(() => curriculums.id)
    .notNull(),
});

// การดำเนินการอนุมัติ
export const approvalActions = pgTable('approval_actions', {
  id: uuid().primaryKey().defaultRandom(),
  curriculumId: uuid()
    .references(() => curriculums.id)
    .notNull(),
  approvedBy: varchar({ length: 255 }).notNull(), // ผู้อนุมัติ
  approvalStep: EnumApprovalStepEnum().notNull(), // ขั้นตอนการอนุมัติ
  agendaNumber: integer().notNull(), // หมายเลขวาระ
  isApproved: boolean().notNull(), // อนุมัติหรือไม่
  meetingTitle: varchar({ length: 255 }).notNull(), // ชื่อการประชุม
  remarks: varchar({ length: 255 }), // หมายเหตุ
  attachmentUrls: text().array().default([]), // ไฟล์แนบ
  meetingTime: varchar({ length: 255 }).notNull(), // เวลาประชุม
  meetingDate: date().defaultNow(), // วันที่ประชุม
  createdAt: timestamp().defaultNow(),
});
