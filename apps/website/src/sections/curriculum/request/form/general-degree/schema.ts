import { z } from 'zod';

export const CurriculumReqGeneralDegreeFormSchema = z.object({
  activityId: z.string().uuid().min(1),
  general: z.object({
    ref: z.string().min(1),
    nameTH: z.string().min(1),
    nameEN: z.string().min(1),
    attributes: z
      .array(
        z.union([
          z.instanceof(File).refine((file) => file.size > 0, { message: 'File cannot be empty' }),
          z.string().url(),
        ]),
      )
      .min(1),
  }),
});
