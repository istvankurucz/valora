import getTransactionsByCategoryId from "../../transaction/services/getTransactionsByCategoryId";
import { TransactionCategory } from "../types/transactionCategoryTypes";
import getTransactionCategoryData from "./getTransactionCategoryData";

export default async function getTransactionCategory(id: string): Promise<TransactionCategory> {
	// Get transaction category
	const categoryData = await getTransactionCategoryData(id);

	// Get transactions
	const transactions = await getTransactionsByCategoryId(categoryData.id, { adminId: undefined });

	// Return transaction category
	return { ...categoryData, transactions };
}
