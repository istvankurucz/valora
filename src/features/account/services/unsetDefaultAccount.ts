import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { AccountSelect } from "../types/accountTypes";

export default async function unsetDefaultAccount(): Promise<AccountSelect> {
	// Update account
	const [account] = await db
		.update(AccountTable)
		.set({ default: false })
		.where(eq(AccountTable.default, true))
		.returning();

	// Check account
	if (!account) throw new AppError({ message: "Error unsetting default account." });

	// Return account
	return account;
}
