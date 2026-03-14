import { z } from 'zod';
import { CurriculumApproveFormSchema, EnumCourseImplementationStep } from './schema';

export type CourseImplementationStep = z.infer<typeof EnumCourseImplementationStep>;
export type CurriculumApproveForm = z.infer<typeof CurriculumApproveFormSchema>;
