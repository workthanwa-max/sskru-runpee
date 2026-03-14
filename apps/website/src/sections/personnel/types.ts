import { z } from 'zod';
import { PersonnelFormSchema, PersonnelRolesFormSchema } from './form-schema';

export type PersonnelForm = z.infer<typeof PersonnelFormSchema>;
export type PersonnelRolesForm = z.infer<typeof PersonnelRolesFormSchema>;
