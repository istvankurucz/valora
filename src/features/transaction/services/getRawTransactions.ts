import { db } from "@/src/db/db";
import { TransactionSelect } from "../types/transactionTypes";

export default async function getRawTransactions(): Promise<TransactionSelect[]> {
	const transactions = await db.query.TransactionTable.findMany({
		orderBy: (transaction, { desc }) => [desc(transaction.timestamp)],
	});
	return transactions;
}
