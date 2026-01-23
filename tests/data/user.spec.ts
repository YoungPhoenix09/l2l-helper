import { eq } from 'drizzle-orm'
import { afterAll, expect, describe, beforeEach, test } from 'vitest'
import { db, usersTable } from '../../src/data';
import { testUser } from './testData';

describe('user db operations', async () => {
  beforeEach(async () => {
    db.delete(usersTable).execute();
  });

  test('db can insert and find user', async () => {
    const insertResult = await db.insert(usersTable).values(testUser).returning({ insertedId: usersTable.id }).execute();
    const userId = insertResult[0].insertedId;

    const selectResult = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    
    expect(selectResult[0].id).toEqual(userId);
  });

  test('db can update user', async () => {
    const insertResult = await db.insert(usersTable).values(testUser).returning({ insertedId: usersTable.id }).execute();
    const userId = insertResult[0].insertedId;

    const updateResult = await db.update(usersTable).set({ firstName: "Nathan" }).where(eq(usersTable.id, userId)).returning();
    
    expect(updateResult[0].firstName).toEqual("Nathan");
  });

  afterAll(async () => {
    db.delete(usersTable).execute();
  });
});
