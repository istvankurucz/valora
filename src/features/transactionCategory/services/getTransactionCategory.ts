import getTransactionsByCategoryId from "../../transaction/services/getTransactionsByCategoryId";
import { TransactionCategory } from "../types/transactionCategoryTypes";
import getTransactionCategoryData from "./getTransactionCategoryData";

export default async function getTransactionCategory(
	id: string,
	options: { adminId: string }
): Promise<TransactionCategory> {
	// Get options
	const { adminId } = options;

	// Get transaction category
	const categoryData = await getTransactionCategoryData(id);

	// Get transactions
	const transactions = await getTransactionsByCategoryId(categoryData.id, { adminId });

	// Return transaction category
	return { ...categoryData, transactions };
}
