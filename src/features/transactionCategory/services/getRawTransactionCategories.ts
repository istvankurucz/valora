import { db } from "@/src/db/db";
import { TransactionCategorySelect } from "../types/transactionCategoryTypes";

export default async function getRawTransactionCategories(): Promise<TransactionCategorySelect[]> {
	const categories = await db.query.TransactionCategoryTable.findMany({
		orderBy: (category, { desc }) => [desc(category.createdAt)],
	});
	return categories;
}
