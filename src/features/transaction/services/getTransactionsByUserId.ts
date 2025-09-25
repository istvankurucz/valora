import { db } from "@/src/db/db";
import { Transaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

export default async function getTransactionsByUserId(userId: string): Promise<Transaction[]> {
	// Get transactions
	const transactionsData = await db.query.TransactionTable.findMany({
		where: (transaction, { eq }) => eq(transaction.userId, userId),
		orderBy: (transaction, { desc }) => [desc(transaction.timestamp)],
	});

	// Get transaction details
	const transactions = await Promise.all(
		transactionsData.map(async (transaction) => await getTransactionDetails(transaction))
	);

	// Return transactions
	return transactions;
}
