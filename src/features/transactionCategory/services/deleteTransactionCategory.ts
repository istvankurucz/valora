import { db } from "@/src/db/db";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { eq } from "drizzle-orm";

export default async function deleteTransactionCategory(id: string): Promise<void> {
	// Delete transaction category
	await db.delete(TransactionCategoryTable).where(eq(TransactionCategoryTable.id, id));
}
