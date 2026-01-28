import { eq } from 'drizzle-orm'
import { afterAll, expect, describe, beforeEach, test } from 'vitest'
import { addressTable, db, participantsTable, usersTable } from '../../src/data';
import { testAddress, testParticipant, testUser } from './testData';
import { cleanup } from './utils';

describe('participant db operations', async () => {
  const initUserAndAddress = async () => {
    const addressResult = await db.insert(addressTable).values(testAddress).returning({ insertedId: addressTable.id });
    const addressId = addressResult[0].insertedId;
    const userResult = await db.insert(usersTable).values(testUser).returning({ insertedId: usersTable.id });
    const userId = userResult[0].insertedId;

    return {
      userId,
      addressId,
    };
  };

  beforeEach(async () => {
    await cleanup();
  });

  test('db can insert and find participant', async () => {
    const { userId, addressId } = await initUserAndAddress();
    const participant = {
      ...testParticipant,
      userId,
      addressId,
    };
    
    const participantResult = await db.insert(participantsTable).values(participant).returning({ insertedId: participantsTable.id });
    const participantId = participantResult[0].insertedId;

    const selectResult = await db.select().from(participantsTable).where(eq(participantsTable.id, participantId));
    
    expect(selectResult[0].addressId).toEqual(addressId);
  });

  test('db can update participant', async () => {
    const { userId, addressId } = await initUserAndAddress();

    const participantResult = await db.insert(participantsTable).values({
      ...testParticipant,
      userId,
      addressId,
    }).returning({ insertedId: participantsTable.id }).execute();
    const participantId = participantResult[0].insertedId;
    
    const newDob = new Date(1954, 5, 21);
    const updateResult = await db.update(participantsTable).set({ dob: newDob }).where(eq(participantsTable.id, participantId)).returning();
    
    expect(updateResult[0].dob).toEqual(newDob);
  });

  test('db errors if participant gender is not m or f', async () => {
    await expect(async () => {
      const { userId, addressId } = await initUserAndAddress();

      await db.insert(participantsTable).values({
        ...testParticipant,
        gender: "",
        userId,
        addressId,
      });
    }).rejects.toThrowError();
  });

  afterAll(async () => {
    await cleanup();
  });
});
