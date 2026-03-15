import { z } from 'zod';

export const PermissionFormSchema = z.object({
  name: z.string(),
  systemIds: z.array(z.string().uuid()).optional(),
});
