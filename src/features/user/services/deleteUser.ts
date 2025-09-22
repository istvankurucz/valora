import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import { eq } from "drizzle-orm";

export default async function deleteUser(id: string): Promise<void> {
	// Delete user
	await db.delete(UserTable).where(eq(UserTable.id, id));
}
