import { pgTable, serial, text, varchar, date, customType } from 'drizzle-orm/pg-core';
import { ProfessionalAvailability } from '../../types/common';

const availability = customType<{ data: ProfessionalAvailability, notNull: false, default: false }>({
  dataType() {
    return 'integer';
  },
  toDriver(value: ProfessionalAvailability) {
    return value.valueOf();
  }
});

export const professionalAccounts = pgTable('professional_accounts', {
  id: serial('id').primaryKey(),
  professionalId: serial('professional_id').references(() => professionals.id),
  email: varchar('username', { length: 256 }).notNull(),
  hashedPassword: text('password').notNull(),
  createdAt: date('created_at', { mode: 'date' }).default(new Date()),
});

// TODO (matt): setup AWS for logo upload
export const professionals = pgTable('professionals', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  role: text('role').notNull(),
  bio: text('bio').notNull(),
  status: availability('status').notNull(),
});