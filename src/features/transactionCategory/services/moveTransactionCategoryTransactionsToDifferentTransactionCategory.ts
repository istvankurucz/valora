import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { inArray } from "drizzle-orm";
import { TransactionSelect } from "../../transaction/types/transactionTypes";

export default async function moveTransactionCategoryTransactionsToDifferentTransactionCategory(
	transactionIds: string[],
	newTransactionCategoryId: string
): Promise<TransactionSelect[]> {
	// Update transactions
	const transactions = await db
		.update(TransactionTable)
		.set({ categoryId: newTransactionCategoryId })
		.where(inArray(TransactionTable.id, transactionIds))
		.returning();

	// Return transactions
	return transactions;
}
