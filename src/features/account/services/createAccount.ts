import { db } from "@/src/db/db";
import { AccountTable } from "@/src/db/schemas/Account";
import AppError from "../../error/classes/AppError";
import { AccountInsert, AccountSelect } from "../types/accountTypes";

export default async function createAccount(data: AccountInsert): Promise<AccountSelect> {
	// Create account
	const [account] = await db.insert(AccountTable).values(data).returning();

	// Check account
	if (!account) throw new AppError({ message: "Error creating account." });

	// Return account
	return account;
}
