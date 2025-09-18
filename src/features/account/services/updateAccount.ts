import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { AccountSelect, AccountUpdate } from "../types/accountTypes";

export default async function updateAccount(
	id: string,
	data: AccountUpdate
): Promise<AccountSelect> {
	// Update account
	const [account] = await db
		.update(AccountTable)
		.set(data)
		.where(eq(AccountTable.id, id))
		.returning();

	// Check account
	if (!account) throw new AppError({ message: "Error updating account." });

	// Return account
	return account;
}
