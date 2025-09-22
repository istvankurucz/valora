import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { and, eq } from "drizzle-orm";

export default async function deleteTransactionsByUserIdAndGroupId(params: {
	userId: string;
	groupId: string;
}): Promise<void> {
	// Get params
	const { userId, groupId } = params;

	// Delete transactions
	await db
		.delete(TransactionTable)
		.where(and(eq(TransactionTable.userId, userId), eq(TransactionTable.groupId, groupId)));
}
