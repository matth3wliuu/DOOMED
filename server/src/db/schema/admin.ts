import { pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const adminAccounts = pgTable('admin_accounts', {
  id: serial('id').primaryKey(),
  email: text('email'),
  hashedPassword: text('password').notNull(),
  createdAt: date('created_at', { mode: 'date' }).default(new Date()),
});

export type IAdminAccount = typeof adminAccounts.$inferInsert;
export type SAdminAccount = typeof adminAccounts.$inferSelect;
