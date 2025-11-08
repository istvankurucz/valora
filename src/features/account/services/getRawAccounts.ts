import { db } from "@/src/db/db";
import { AccountSelect } from "../types/accountTypes";

export default async function getRawAccounts(): Promise<AccountSelect[]> {
	const accounts = await db.query.AccountTable.findMany({
		orderBy: (account, { desc }) => [desc(account.createdAt)],
	});
	return accounts;
}
