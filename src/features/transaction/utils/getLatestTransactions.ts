import { TransactionType } from "../constants/transactionTypeOptions";
import { Transaction } from "../types/transactionTypes";

export default function getLatestTransactions(
	transactions: Transaction[],
	type: TransactionType,
	options = { count: 3 }
): Transaction[] {
	// Get options
	const { count } = options;

	// Filter transactions by type
	const filteredTransactions = transactions.filter((transaction) => transaction.type === type);

	// Sort transactions by timestamp in descending order
	const sortedTransactions = filteredTransactions.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);

	// Filter transactions by label to ensure uniqueness
	const uniqueTransactions: Transaction[] = [];
	for (const transaction of sortedTransactions) {
		// Get transaction by label
		const uniqueTransaction = uniqueTransactions.find((t) => t.label === transaction.label);

		// Check if transaction is already in the list
		if (!uniqueTransaction) uniqueTransactions.push(transaction);

		// Check number of transactions
		if (uniqueTransactions.length === count) return uniqueTransactions;
	}

	// Return uniqueTransactions
	return uniqueTransactions;
}
