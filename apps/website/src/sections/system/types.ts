import { z } from 'zod';
import { SystemFormSchema } from './form-schema';

export type SystemForm = z.infer<typeof SystemFormSchema>;
