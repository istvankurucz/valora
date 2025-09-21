import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { eq } from "drizzle-orm";

export default async function deleteTransactionsByCategoryId(
	transactionCategoryId: string
): Promise<void> {
	// Delete transactions
	await db.delete(TransactionTable).where(eq(TransactionTable.categoryId, transactionCategoryId));
}
