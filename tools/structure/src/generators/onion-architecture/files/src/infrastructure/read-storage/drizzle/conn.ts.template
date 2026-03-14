import postgres from 'postgres';
import { DB_URL } from './config';

export const migrationClient = postgres(DB_URL, { max: 1 });
export const queryClient = postgres(DB_URL);
