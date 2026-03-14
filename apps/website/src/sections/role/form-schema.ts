import { RoleType } from '@src/types/domain';
import { z } from 'zod';

export const RolePermissionFormSchema = z.object({
  roleId: z.string().uuid(),
  permissionName: z.string(),
});

export const RoleFormSchema = z.object({
  name: z.string(),
  type: z.enum([RoleType.ADMIN, RoleType.STUDENT, RoleType.PERSONNEL]),
});
