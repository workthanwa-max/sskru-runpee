import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient } from './conn';

async function run() {
  await migrate(drizzle(migrationClient), { migrationsFolder: './migrations' });
  await migrationClient.end();
}

run()
  .then(() => console.log('DB Migrate completed'))
  .catch(console.error);
