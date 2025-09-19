import { db } from "@/src/db/db";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import {
	TransactionCategorySelect,
	TransactionCategoryUpdate,
} from "../types/transactionCategoryTypes";

export default async function updateTransactionCategory(
	id: string,
	data: TransactionCategoryUpdate
): Promise<TransactionCategorySelect> {
	// Update category
	const [category] = await db
		.update(TransactionCategoryTable)
		.set(data)
		.where(eq(TransactionCategoryTable.id, id))
		.returning();

	// Check category
	if (!category) throw new AppError({ message: "Error updating category." });

	// Return category
	return category;
}
