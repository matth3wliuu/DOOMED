import type { Config } from 'drizzle-kit';
import { env } from '../env';
import dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
  },
  strict: true,
} satisfies Config;
