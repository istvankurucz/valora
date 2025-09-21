import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { eq } from "drizzle-orm";

export default async function deleteAccount(id: string): Promise<void> {
	// Delete account
	await db.delete(AccountTable).where(eq(AccountTable.id, id));
}
