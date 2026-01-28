import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { addressTable, usersTable } from "..";

export const participantsTable = sqliteTable("participants", {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => usersTable.id),
  dob: integer("dob", { mode: "timestamp"}),
  gender: text().notNull(),
  addressId: integer("address_id").references(() => addressTable.id)
}, (table) => [
  check("gender_value_check", sql`${table.gender} = 'm' OR ${table.gender} = 'f'`),
]);
