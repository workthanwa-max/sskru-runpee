import { z } from 'zod';

export const FacultyFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  parentId: z.string().optional(),
  shortName: z.string().optional(),
});
