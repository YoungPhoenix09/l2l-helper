import { eq } from 'drizzle-orm'
import { afterAll, expect, describe, beforeEach, test } from 'vitest'
import { db, User, usersTable } from '../../src/data';

describe('user db operations', async () => {
  const user: User = {
    id: null,
    firstName: "Jonathan",
    lastName: "Payne",
    email: "payne.jonathan777@gmail.com",
    admin: false
  };

  beforeEach(async () => {
    db.delete(usersTable).execute();
  });

  test('db can insert and find user', async () => {
    const insertResult = await db.insert(usersTable).values(user).returning({ insertedId: usersTable.id }).execute();
    const userId = insertResult[0].insertedId;

    const selectResult = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    
    expect(selectResult[0].id).toEqual(userId);
  });

  test('db can update user', async () => {
    const insertResult = await db.insert(usersTable).values(user).returning({ insertedId: usersTable.id }).execute();
    const userId = insertResult[0].insertedId;

    const updateResult = await db.update(usersTable).set({ firstName: "Nathan" }).where(eq(usersTable.id, userId)).returning();
    
    expect(updateResult[0].firstName).toEqual("Nathan");
  });

  afterAll(async () => {
    db.delete(usersTable).execute();
  });
});
