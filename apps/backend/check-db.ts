import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './src/common/drizzle/tables';
import 'dotenv/config';

async function check() {
  const client = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'oass',
    ssl: false,
  });

  const db = drizzle(client, { schema });
  const idns = await db.select().from(schema.identities);
  console.log('Identities found:', idns.map(i => ({ username: i.username, status: i.status })));
  await client.end();
}

check().catch(console.error);
