import { integer, pgTable, serial, text, varchar, date } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id').references(() => company.id).notNull(),
  title: varchar('title', { length: 50 }).notNull(),
  description: text('description').notNull(),
  expiry: date('expiry', { mode: 'date' }).notNull(),
});

export const companyAccount = pgTable('company_account', {
  id: serial('id').primaryKey(),
  email: varchar('username', { length: 256 }).notNull(),
  companyId: integer('company_id').references(() => company.id),
  hashedPassword: text('password').notNull(),
});

export const company = pgTable('company', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  location: varchar('location', { length: 255 }),
  description: text('description'),
});
