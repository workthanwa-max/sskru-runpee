import { z } from 'zod';
import { ApplicantInfoSchema } from './applicant-info-schema';

export type ApplicantInfoSchemaForm = z.infer<typeof ApplicantInfoSchema>;
