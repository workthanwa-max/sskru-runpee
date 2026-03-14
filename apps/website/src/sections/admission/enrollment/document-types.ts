import { z } from 'zod';
import { DocumentSchema } from './document-schema';

export type DocumentSchemaForm = z.infer<typeof DocumentSchema>;
