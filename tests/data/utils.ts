import { addressTable, db, participantsTable, usersTable } from "../../src/data";

export const cleanup = async () => {
  await db.delete(participantsTable);
  await db.delete(addressTable);
  await db.delete(usersTable);
};
