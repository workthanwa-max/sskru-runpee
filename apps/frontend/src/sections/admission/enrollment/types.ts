import { z } from 'zod';
import { EnrollmentFormSchema } from './schema';

export type EnrollmentForm = z.infer<typeof EnrollmentFormSchema>;
