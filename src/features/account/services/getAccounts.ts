import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { IconTable } from "@/src/db/schemas/Icon";
import { desc, eq } from "drizzle-orm";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import getTransactionsByAccountId from "../../transaction/services/getTransactionsByAccountId";
import { Account } from "../types/accountTypes";

export default async function getAccounts(): Promise<Account[]> {
	// Get accounts
	const accountDatas = await db
		.select({
			id: AccountTable.id,
			name: AccountTable.name,
			updatedAt: AccountTable.updatedAt,
			createdAt: AccountTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(AccountTable)
		.innerJoin(IconTable, eq(AccountTable.iconId, IconTable.id))
		.orderBy(desc(AccountTable.createdAt));

	// Get transactions
	const accounts = await Promise.all(
		accountDatas.map(async (account) => {
			const transactions = await getTransactionsByAccountId(account.id);
			return { ...account, transactions };
		})
	);

	// Return accounts
	return accounts;
}
