import postgres from 'postgres';
import { env } from '../env';
import { drizzle } from 'drizzle-orm/postgres-js';

const client = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
});

export const db = drizzle(client);
