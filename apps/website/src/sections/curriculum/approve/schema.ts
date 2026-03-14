import { z } from 'zod';

export const EnumCourseImplementationStep = z.enum([
  'ACADEMIC_COMMITTEE',
  'ACADEMIC_COUNCIL',
  'UNDER_CONSIDERATION',
  'UNIVERSITY_COUNCIL',
  'APPROVED',
]);

export const CurriculumApproveFormSchema = z.object({
  activityId: z.string().uuid(),
  agenda: z.number(),
  approve: z.enum(['1', '0']),
  title: z.string().min(1),
  note: z.string().optional(),
  step: EnumCourseImplementationStep,
  time: z.string().min(1),
  date: z.date(),
  attachFiles: z
    .array(
      z.union([
        z.instanceof(File).refine((file) => file.size > 0, { message: 'File cannot be empty' }),
        z.string().url(),
      ]),
    )
    .nullish(),
});
