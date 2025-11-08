import { db } from "@/src/db/db";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import {
	TransactionCategoryInsert,
	TransactionCategorySelect,
} from "../types/transactionCategoryTypes";

export default async function createTransactionCategories(
	data: TransactionCategoryInsert[]
): Promise<TransactionCategorySelect[]> {
	const categories = await db.insert(TransactionCategoryTable).values(data).returning();
	return categories;
}
