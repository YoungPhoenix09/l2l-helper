import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/data/drizzle',
  dbCredentials: {
    url: process.env['DB_FILE_NAME'],
  },
  schema: './src/data/schema',
  dialect: 'sqlite',
});
