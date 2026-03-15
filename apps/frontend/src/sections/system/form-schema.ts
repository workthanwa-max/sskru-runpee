import { z } from 'zod';

export const SystemFormSchema = z.object({
  name: z.string(),
  note: z.string(),
  url: z.string(),
  active: z.boolean().default(false),
  loginRequired: z.boolean().default(true),
});
