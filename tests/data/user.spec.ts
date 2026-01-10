import { expect, describe, beforeAll, test } from 'vitest'
import { db, User, usersTable } from '../../src/data';

describe('user db operations', async () => {
  beforeAll(async () => {
    db.delete(usersTable).execute();
  });

  test('api can insert user', async () => {
    const user: User = {
      id: null,
      firstName: "Jonathan",
      lastName: "Payne",
      email: "payne.jonathan777@gmail.com",
      admin: false
    };

    expect(() => {
      db.insert(usersTable).values(user).execute();
    }).not.toThrow();
  });
});
