import { z } from 'zod';
import { CurriculumReqCurriculumFormSchema } from './schema';

export type CurriculumReqCurriculumForm = z.infer<typeof CurriculumReqCurriculumFormSchema>;
