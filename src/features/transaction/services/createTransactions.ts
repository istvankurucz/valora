import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { TransactionInsert, TransactionSelect } from "../types/transactionTypes";

export default async function createTransactions(
	data: TransactionInsert[]
): Promise<TransactionSelect[]> {
	const transactions = await db.insert(TransactionTable).values(data).returning();
	return transactions;
}
