import type { Config } from 'drizzle-kit';
import { env } from '../env';

export default {
  schema: './schema/*',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
  },
} satisfies Config;
