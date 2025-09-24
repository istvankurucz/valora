import { db } from "@/src/db/db";
import { Transaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

export default async function getTransactionsByCategoryId(
	categoryId: string,
	params: { adminId?: string }
): Promise<Transaction[]> {
	// Get params
	const { adminId } = params;

	// Get transactions
	const transactionSelects = await db.query.TransactionTable.findMany({
		where: (transaction, { eq, and }) =>
			and(
				eq(transaction.categoryId, categoryId),
				adminId ? eq(transaction.userId, adminId) : undefined
			),
		orderBy: (transaction, { desc }) => desc(transaction.timestamp),
	});

	// Get full transactions
	const transactions = await Promise.all(
		transactionSelects.map(async (transaction) => await getTransactionDetails(transaction))
	);

	// Return transactions
	return transactions;
}
