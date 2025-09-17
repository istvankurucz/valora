import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import { TransactionCategory } from "../types/transactionCategoryTypes";

export default async function getTransactionCategory(id: string): Promise<TransactionCategory> {
	// Get category
	const [category] = await db
		.select({
			id: TransactionCategoryTable.id,
			name: TransactionCategoryTable.name,
			type: TransactionCategoryTable.type,
			icon: ICON_COLUMNS,
		})
		.from(TransactionCategoryTable)
		.innerJoin(IconTable, eq(TransactionCategoryTable.iconId, IconTable.id))
		.where(eq(TransactionCategoryTable.id, id));

	// Check category
	if (!category) throw new AppError({ message: "Transaction category not found." });

	// Return category
	return category;
}
