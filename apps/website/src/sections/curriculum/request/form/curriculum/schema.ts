import { z } from 'zod';

const CourseStructureSchema = z.object({
  topicOrContent: z.string().min(1), // หัวข้อหรือเนื้อหา
  competenciesOrLearningOutcomes: z.string().min(1), // สมรรถนะ/ผลการเรียนรู้
  learningHours: z.object({
    practice: z.number().nonnegative(), // ปฏิบัติ
    theory: z.number().nonnegative(), // ทฤษฎี
  }), // จำนวนชั่วโมงการเรียนรู้ (รูปแบบ, ทฤษฎี)
  formats: z.array(z.string()).min(1), // รูปแบบ
});

const LearningOutcomeSchema = z.object({
  learningOutcome: z.string().min(1), // คอลัมน์: ผลลัพธ์ การเรียนรู้
  teachingStrategy: z.string().min(1), // คอลัมน์: กลยุทธ์การสอน
  assessmentStrategy: z.string().min(1), // คอลัมน์: กลยุทธ์การประเมินผล
});

export const CurriculumReqCurriculumFormSchema = z.object({
  activityId: z.string().uuid().min(1),
  objectives: z
    .array(
      z.object({
        value: z.string().min(1),
      }),
    )
    .min(1), //วัตถุประสงค์ของหลักสูตร
  content: z.string().min(1),
  learningOutcomes: z.array(LearningOutcomeSchema).min(1), //ผลลัพธ์การเรียนรู้และการจัดกระบวนการเรียนรู้
  courseStructures: z.array(CourseStructureSchema).min(1), //โครงสร้างหลักสูตร
});
