import { z } from 'zod';
import { RegisterFormSchema } from './form-schema';

export type RegisterForm = z.infer<typeof RegisterFormSchema>;
