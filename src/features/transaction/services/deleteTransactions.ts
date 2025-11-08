import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";

export default async function deleteTransactions(): Promise<void> {
	await db.delete(TransactionTable);
}
