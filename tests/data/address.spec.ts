import { eq } from 'drizzle-orm'
import { afterAll, expect, describe, beforeEach, test } from 'vitest'
import { db, addressTable } from '../../src/data';
import { testAddress } from './testData';
import { cleanup } from './utils';

describe('address db operations', async () => {
  beforeEach(async () => {
    await cleanup();
  });

  test('db can insert and find address', async () => {
    const insertResult = await db.insert(addressTable).values(testAddress).returning({ insertedId: addressTable.id }).execute();
    const addressId = insertResult[0].insertedId;

    const selectResult = await db.select().from(addressTable).where(eq(addressTable.id, addressId));
    
    expect(selectResult[0].id).toEqual(addressId);
  });

  test('db can update address', async () => {
    const insertResult = await db.insert(addressTable).values(testAddress).returning({ insertedId: addressTable.id }).execute();
    const addressId = insertResult[0].insertedId;

    const updateResult = await db.update(addressTable).set({ addressLine2: "Apt 456" }).where(eq(addressTable.id, addressId)).returning();
    
    expect(updateResult[0].addressLine2).toEqual("Apt 456");
  });

  test('db errors if address state is more than 2 characters', async () => {
    await expect(async () => {
      const badAddress = structuredClone(testAddress);
      badAddress.state = "FLORIDA";
      return db.insert(addressTable).values(badAddress).returning({ insertedId: addressTable.id }).execute();
    }).rejects.toThrowError();
  });

  test('db errors if address state is less than 2 characters', async () => {
    await expect(async () => {
      const badAddress = structuredClone(testAddress);
      badAddress.state = "F";
      return db.insert(addressTable).values(badAddress).returning({ insertedId: addressTable.id }).execute();
    }).rejects.toThrowError();
  });

  afterAll(async () => {
    await cleanup();
  });
});
