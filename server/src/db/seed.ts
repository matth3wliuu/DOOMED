import { LogModule, Logger } from '../logging';
import { db } from './connection';
import { adminAccounts } from './schema/admin';
import type { IAdminAccount } from './schema/admin';

const LM = new LogModule('SEEDER');

export const seedDB = async () => {
  Logger.Info(LM, 'Begin seeding the database');

  const admin: IAdminAccount = {
    email: 'admin@email.com',
    hashedPassword: 'admin',
  };
  await db.insert(adminAccounts).values(admin);

  Logger.Info(LM, 'Database has been seeded');
};
