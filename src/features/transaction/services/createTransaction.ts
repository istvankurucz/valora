import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import AppError from "../../error/classes/AppError";
import { TransactionInsert, TransactionSelect } from "../types/transactionTypes";

export default async function createTransaction(
	data: TransactionInsert
): Promise<TransactionSelect> {
	// Create transaction
	const [transaction] = await db.insert(TransactionTable).values(data).returning();

	// Check transaction
	if (!transaction) throw new AppError({ message: "Error creating transaction." });

	// Return transaction
	return transaction;
}
