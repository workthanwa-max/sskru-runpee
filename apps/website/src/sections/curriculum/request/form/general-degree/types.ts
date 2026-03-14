import { z } from 'zod';
import { CurriculumReqGeneralDegreeFormSchema } from './schema';

export type CurriculumReqGeneralDegreeForm = z.infer<typeof CurriculumReqGeneralDegreeFormSchema>;
