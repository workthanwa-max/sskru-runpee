import { z } from 'zod';
import { FacultyFormSchema } from './form-schema';

export type FacultyForm = z.infer<typeof FacultyFormSchema>;
