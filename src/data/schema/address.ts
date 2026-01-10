import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";

export const addressTable = sqliteTable("address", {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  addressLine1: text().notNull(),
  addressLine2: text(),
  city: text().notNull(),
  state: text().notNull(),
}, (table) => [
  check("state_length_check", sql`length(${table.state}) = 2`),
])