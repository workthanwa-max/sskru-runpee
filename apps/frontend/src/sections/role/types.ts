import { z } from 'zod';
import { RoleFormSchema, RolePermissionFormSchema } from './form-schema';

export type RolePermissionForm = z.infer<typeof RolePermissionFormSchema>;
export type RoleForm = z.infer<typeof RoleFormSchema>;
