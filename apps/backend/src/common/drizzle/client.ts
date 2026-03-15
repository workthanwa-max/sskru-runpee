import { drizzle } from 'drizzle-orm/postgres-js';
import { queryClient } from './conn';
import * as schema from './tables';

export const dbClient = drizzle(queryClient, { schema });
