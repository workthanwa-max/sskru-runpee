import { z } from 'zod';

export const PersonnelFormSchema = z.object({
  personnelId: z.string().min(1).max(255),
  phone: z.string().min(1).max(255),
  firstname: z.string().min(1).max(255),
  lastname: z.string().min(1).max(255),
  academicPosition: z.string().max(255).nullable().optional(),
  highestEducation: z.string().min(1).max(255),
  programOrField: z.string().min(1).max(255),
  university: z.string().min(1).max(255),
  graduationYear: z.number().int(),
  facultyId: z.string().uuid().optional(),
});

export const PersonnelRolesFormSchema = z.object({
  personnelId: z.string().uuid(),
  roleIds: z.array(z.string().uuid()),
});
