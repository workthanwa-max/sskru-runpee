import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    firstname: z.string().min(1, { message: 'Name is required' }).trim(),
    lastname: z.string().min(1, { message: 'Last name is required' }).trim(),
    personnelId: z
      .string()
      .length(13, { message: 'Personnel ID must be exactly 13 characters' })
      .regex(/^\d+$/, { message: 'Personnel ID must contain only numbers' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters long' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(/^\d+$/, { message: 'Phone number must contain only numbers' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Points to `confirmPassword` in the error
  });
