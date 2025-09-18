import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { IconTable } from "@/src/db/schemas/Icon";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import { AccountData } from "../types/accountTypes";

export default async function getAccountData(id: string): Promise<AccountData> {
	// Get account
	const [account] = await db
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
		.where(eq(AccountTable.id, id));

	// Check account
	if (!account) throw new AppError({ message: "Account not found." });

	// Return account
	return account;
}
