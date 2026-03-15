import { z } from 'zod';
import { AddressInfoSchema } from './_schema';

export const ParentInfoDetailSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }).trim(),
  lastname: z.string().min(1, { message: 'Last name is required' }).trim(),
  personnelId: z
    .string()
    .length(13, { message: 'Personnel ID must be exactly 13 characters' })
    .regex(/^\d+$/, { message: 'Personnel ID must contain only numbers' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }).trim(),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d+$/, { message: 'Phone number must contain only numbers' })
    .trim(),
  guardian: z.enum(['father', 'mother', 'guardian']).optional(),
});

export const ParentInfoSchema = z.object({
  father: ParentInfoDetailSchema,
  mother: ParentInfoDetailSchema,
  guardian: ParentInfoDetailSchema,
  address: AddressInfoSchema,
});
