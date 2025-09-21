import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { IconTable } from "@/src/db/schemas/Icon";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import getTransactionsByAccountId from "../../transaction/services/getTransactionsByAccountId";
import { Account } from "../types/accountTypes";

export default async function getDefaultAccount(): Promise<Account> {
	// Get account
	const [accountData] = await db
		.select({
			id: AccountTable.id,
			name: AccountTable.name,
			default: AccountTable.default,
			updatedAt: AccountTable.updatedAt,
			createdAt: AccountTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(AccountTable)
		.innerJoin(IconTable, eq(AccountTable.iconId, IconTable.id))
		.where(eq(AccountTable.default, true));

	// Check account
	if (!accountData) throw new AppError({ message: "Account not found." });

	// Get transactions
	const transactions = await getTransactionsByAccountId(accountData.id);

	// Return account
	return { ...accountData, transactions };
}
