import { pgTable, serial, text, varchar, date, real } from 'drizzle-orm/pg-core';

export const companyAccounts = pgTable('company_accounts', {
  id: serial('id').primaryKey(),
  companyId: serial('company_id').references(() => companies.id),
  email: varchar('username', { length: 256 }).notNull(),
  hashedPassword: text('password').notNull(),
  createdAt: date('created_at', { mode: 'date' }).default(new Date()),
});

// TODO (matt): setup AWS for logo upload
export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  location: varchar('location', { length: 255 }),
  description: text('description'),
  rating: real('rating').default(0),
});
