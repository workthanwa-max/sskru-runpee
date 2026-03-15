import { z } from 'zod';
import { PermissionFormSchema } from './form-schema';

export type PermissionForm = z.infer<typeof PermissionFormSchema>;
