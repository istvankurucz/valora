import { db } from "@/src/db/db";
import { Transaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

export default async function getTransactionsByAccountId(
	accountId: string
): Promise<Transaction[]> {
	// Get transactions
	const transactionSelects = await db.query.TransactionTable.findMany({
		where: (transaction, { eq }) => eq(transaction.accountId, accountId),
		orderBy: (transaction, { desc }) => desc(transaction.timestamp),
	});

	// Get full transactions
	const transactions = await Promise.all(
		transactionSelects.map(async (transaction) => await getTransactionDetails(transaction))
	);

	// Return transactions
	return transactions;
}
