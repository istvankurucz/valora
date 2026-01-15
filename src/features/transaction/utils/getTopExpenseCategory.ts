import { TransactionCategoryData } from "../../transactionCategory/types/transactionCategoryTypes";
import { Transaction } from "../types/transactionTypes";

export default function getTopExpenseCategory(
	transactions: Transaction[]
): TransactionCategoryData | null {
	// No transactions
	if (transactions.length === 0) return null;

	// Create an array to store total expenses per category
	const categoriesData: (TransactionCategoryData & { totalAmount: number })[] = [];

	// Iterate through transactions to calculate total expenses per category
	transactions.forEach((transaction) => {
		// Check if the transaction is an expense
		if (transaction.type !== "expense") return;

		// Find the category data
		const categoryDataIndex = categoriesData.findIndex(
			(category) => category.id === transaction.category.id
		);

		if (categoryDataIndex !== -1) {
			categoriesData[categoryDataIndex]!.totalAmount += transaction.amount;
		} else {
			categoriesData.push({
				...transaction.category,
				totalAmount: transaction.amount,
			});
		}
	});

	if (categoriesData.length === 0) return null;

	// Find the category with the highest total expense
	const topCategory = categoriesData.reduce((prev, current) => {
		return current.totalAmount > prev.totalAmount ? current : prev;
	});

	// Return the top category
	return topCategory;
}
