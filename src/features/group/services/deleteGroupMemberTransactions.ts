import { db } from "@/src/db/db";
import { TransactionTable } from "@/src/db/schemas/Transaction";
import { and, eq, not } from "drizzle-orm";

export default async function deleteGroupMemberTransactions(params: {
	groupId: string;
	adminId: string;
}): Promise<void> {
	// Get params
	const { groupId, adminId } = params;

	// Delete non admin transactions
	await db
		.delete(TransactionTable)
		.where(and(eq(TransactionTable.groupId, groupId), not(eq(TransactionTable.userId, adminId))));
}
