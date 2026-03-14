import { z } from 'zod';
import { CurriculumReqGeneralFormSchema } from './schema';

export type CurriculumReqGeneralForm = z.infer<typeof CurriculumReqGeneralFormSchema>;
