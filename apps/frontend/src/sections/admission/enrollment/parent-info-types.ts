import { z } from 'zod';
import { ParentInfoSchema } from './parent-info-schema';

export type ParentInfoSchemaForm = z.infer<typeof ParentInfoSchema>;
