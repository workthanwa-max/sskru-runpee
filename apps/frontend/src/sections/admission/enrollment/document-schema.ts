import { z } from 'zod';

export const DocumentSchema = z.object({
  qualification: z.string().min(1, { message: 'Qualification is required' }).trim(),
  province: z.string().min(1, { message: 'Province is required' }).trim(),
  schoolName: z.string().min(1, { message: 'School name is required' }).trim(),
  gpax: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'GPAX must be a numeric value with up to two decimal places',
    })
    .refine((val) => parseFloat(val) <= 4.0, { message: 'GPAX must not exceed 4.0' }),
  academicTranscriptFront: z.union([
    z.instanceof(File).refine((file) => file.size > 0, { message: 'File cannot be empty' }),
    z.string().url({ message: 'Academic transcript front must be a valid URL' }),
  ]),
  academicTranscriptBack: z.union([
    z.instanceof(File).refine((file) => file.size > 0, { message: 'File cannot be empty' }),
    z.string().url({ message: 'Academic transcript back must be a valid URL' }),
  ]),
});
