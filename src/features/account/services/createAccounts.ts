import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { AccountInsert, AccountSelect } from "../types/accountTypes";

export default async function createAccounts(data: AccountInsert[]): Promise<AccountSelect[]> {
	const accounts = await db.insert(AccountTable).values(data).returning();
	return accounts;
}
