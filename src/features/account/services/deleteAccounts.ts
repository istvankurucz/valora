import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";

export default async function deleteAccounts(): Promise<void> {
	await db.delete(AccountTable);
}
