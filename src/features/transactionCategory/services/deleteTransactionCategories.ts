import { db } from "@/src/db/db";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";

export default async function deleteTransactionCategories(): Promise<void> {
	await db.delete(TransactionCategoryTable);
}
