import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { asc, eq } from "drizzle-orm";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import getTransactionsByCategoryId from "../../transaction/services/getTransactionsByCategoryId";
import { TransactionCategory } from "../types/transactionCategoryTypes";

export default async function getTransactionCategories(): Promise<TransactionCategory[]> {
	// Get categories
	const categoriesData = await db
		.select({
			id: TransactionCategoryTable.id,
			name: TransactionCategoryTable.name,
			type: TransactionCategoryTable.type,
			updatedAt: TransactionCategoryTable.updatedAt,
			createdAt: TransactionCategoryTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(TransactionCategoryTable)
		.innerJoin(IconTable, eq(TransactionCategoryTable.iconId, IconTable.id))
		.orderBy(asc(TransactionCategoryTable.createdAt));

	// Get transactions
	const categories = await Promise.all(
		categoriesData.map(async (category) => {
			const transactions = await getTransactionsByCategoryId(category.id);
			return { ...category, transactions };
		})
	);

	// Return categories
	return categories;
}
