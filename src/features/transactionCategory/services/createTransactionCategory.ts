import { db } from "@/src/db/db";
import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import AppError from "../../error/classes/AppError";
import {
	TransactionCategoryInsert,
	TransactionCategorySelect,
} from "../types/transactionCategoryTypes";

export default async function createTransactionCategory(
	data: TransactionCategoryInsert
): Promise<TransactionCategorySelect> {
	// Create category
	const [category] = await db.insert(TransactionCategoryTable).values(data).returning();

	// Check category
	if (!category) throw new AppError({ message: "Error creating transaction category." });

	// Return category
	return category;
}
