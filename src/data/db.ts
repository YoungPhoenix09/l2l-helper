require('dotenv').config();
import { drizzle } from 'drizzle-orm/better-sqlite3';

const dbName = process.env['DB_FILE_NAME'];
export const db = drizzle(dbName);
