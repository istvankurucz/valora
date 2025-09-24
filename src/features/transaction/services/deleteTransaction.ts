import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { eq } from "drizzle-orm";

export default async function deleteTransaction(id: string): Promise<void> {
	// Delete transaction
	await db.delete(TransactionTable).where(eq(TransactionTable.id, id));
}
