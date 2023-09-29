import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  date,
  customType,
  real,
  primaryKey,
} from 'drizzle-orm/pg-core';

import { companies } from './company';
import { professionals } from './professional';
import { ProjectWorkMode } from '../../types/common';

const workMode = customType<{ data: ProjectWorkMode; notNull: false; default: false }>({
  dataType() {
    return 'integer';
  },
  toDriver(value: ProjectWorkMode) {
    return value.valueOf();
  },
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id')
    .references(() => companies.id)
    .notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description').notNull(),
  capacity: integer('capacity').notNull(),
  roles: text('roles').notNull(),
  pay: real('pay').notNull(),
  workMode: workMode('work_mode').notNull(),
  start: date('start', { mode: 'date' }).notNull(),
  end: date('end', { mode: 'date' }).notNull(),
  createdAt: date('created_at', { mode: 'date' }).default(new Date()),
});

export const projectContributors = pgTable(
  'project_contributors',
  {
    projectId: serial('project_id').references(() => projects.id),
    professionalId: serial('professional_id').references(() => professionals.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.projectId, table.professionalId),
    };
  },
);
