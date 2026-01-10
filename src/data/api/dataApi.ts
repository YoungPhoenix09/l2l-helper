import { ipcMain } from 'electron';
import { db, usersTable } from '..';
import { eq } from 'drizzle-orm';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    admin: boolean;
}

export const setupDataApi = () => {
    ipcMain.on("insert-user", (_event, user: User) => {
        db.insert(usersTable).values(user)
        .onConflictDoUpdate({
            target: usersTable.id,
            set: {
                ...user
            },
        });
    });

    ipcMain.on("get-users", () => {
        return db.select().from(usersTable);
    });

    ipcMain.on("get-user-by-id", (_event, id: number) => {
        return db.select().from(usersTable).where(eq(usersTable.id, id));
    });
}
