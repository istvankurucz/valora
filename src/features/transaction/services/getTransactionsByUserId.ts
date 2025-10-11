import { db } from "@/src/db/db";
import { Transaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

// const PAGE_ITEMS = 10;

export default async function getTransactionsByUserId(
	userId: string
	// options: { page: number }
): /* Promise<{ transactions: Transaction[]; nextPage?: number }>  */ Promise<Transaction[]> {
	// Get options
	// const { page } = options;

	// Get transactions
	const transactionsData = await db.query.TransactionTable.findMany({
		where: (transaction, { eq }) => eq(transaction.userId, userId),
		orderBy: (transaction, { desc }) => [desc(transaction.timestamp)],
		// offset: (page - 1) * PAGE_ITEMS,
		// limit: PAGE_ITEMS,
	});

	// Get transaction details
	const transactions = await Promise.all(
		transactionsData.map(async (transaction) => await getTransactionDetails(transaction))
	);

	// Return transactions
	return transactions;
	// return {
	// 	transactions,
	// 	nextPage: transactions.length === PAGE_ITEMS ? page + 1 : undefined,
	// };
}
