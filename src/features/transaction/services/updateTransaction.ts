import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { TransactionSelect, TransactionUpdate } from "../types/transactionTypes";

export default async function updateTransaction(
	id: string,
	data: TransactionUpdate
): Promise<TransactionSelect> {
	// Update transaction
	const [transaction] = await db
		.update(TransactionTable)
		.set(data)
		.where(eq(TransactionTable.id, id))
		.returning();

	// Check transaction
	if (!transaction) throw new AppError({ message: "Error updating transaction." });

	// Return transaction
	return transaction;
}
