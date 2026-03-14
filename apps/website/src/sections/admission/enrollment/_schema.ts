import { z } from 'zod';

export const AddressInfoSchema = z.object({
  houseNumber: z.string().min(1, { message: 'House number is required' }).trim(),
  moo: z.string().min(1, { message: 'Moo is required' }).trim(),
  street: z.string().min(1, { message: 'Street is required' }).trim(),
  subDistrict: z.string().min(1, { message: 'Sub-district is required' }).trim(),
  district: z.string().min(1, { message: 'District is required' }).trim(),
  province: z.string().min(1, { message: 'Province is required' }).trim(),
  postalCode: z
    .string()
    .min(5, { message: 'Postal code is required' })
    .max(5, { message: 'Postal code must be exactly 5 digits' })
    .regex(/^\d+$/, { message: 'Postal code must contain only numbers' }),
});
