import { z } from 'zod';
import { ProgramType } from '../constant';
import { AddressInfoSchema } from './_schema';

const PersonalInfoSchema = z.object({
  prefix: z.string().min(1, { message: 'Prefix is required' }).trim(),
  gender: z.string().min(1),
  firstname: z.string().min(1, { message: 'First name is required' }).trim(),
  lastname: z.string().min(1, { message: 'Last name is required' }).trim(),
  firstnameEN: z.string().min(1, { message: 'First name (English) is required' }).trim(),
  lastnameEN: z.string().min(1, { message: 'Last name (English) is required' }).trim(),
  email: z.string().email({ message: 'Invalid email format' }).trim(),
  birth: z.preprocess((value) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return value;
  }, z.date({ required_error: 'Birth date is required', invalid_type_error: 'Invalid date format' })),
  nationality: z.string().min(1, { message: 'Nationality is required' }).trim(),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d+$/, { message: 'Phone number must contain only numbers' })
    .trim(),
  personnelId: z
    .string()
    .length(13, { message: 'Personnel ID must be exactly 13 characters' })
    .regex(/^\d+$/, { message: 'Personnel ID must contain only numbers' }),
});

export const ApplicantInfoSchema = z.object({
  programType: z.enum([ProgramType.GRADUATE, ProgramType.PART_TIME, ProgramType.REGULAR]),
  facultyId: z.string().min(1),
  personalInfo: PersonalInfoSchema,
  addressInfo: AddressInfoSchema,
});
