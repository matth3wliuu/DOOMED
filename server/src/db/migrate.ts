import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './connection';
import { LogModule, Logger } from '../logging';

const LM = new LogModule('MIGRATOR');

export const migrateDB = async () => {
  Logger.Info(LM, 'Begin database migration');
  await migrate(db, { migrationsFolder: 'src/db/migrations'});
  Logger.Info(LM, 'Database migration has been completed');
}

void (async () => {
  await migrateDB();
}) ();