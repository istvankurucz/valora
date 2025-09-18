import { db } from "@/src/db/db";
import { Transaction } from "../types/transactionTypes";
import getFullTransaction from "./getFullTransaction";

export default async function getTransactionsByGroupId(groupId: string): Promise<Transaction[]> {
	// Get transactions
	const transactionSelects = await db.query.TransactionTable.findMany({
		where: (transaction, { eq }) => eq(transaction.groupId, groupId),
		orderBy: (transaction, { desc }) => desc(transaction.timestamp),
	});

	// Get full transactions
	const transactions = await Promise.all(
		transactionSelects.map(async (transaction) => await getFullTransaction(transaction))
	);

	// Return transactions
	return transactions;
}
