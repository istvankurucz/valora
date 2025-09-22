import { db } from "@/src/db/db";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { and, eq } from "drizzle-orm";

export default async function deleteGroupUser(params: {
	groupId: string;
	userId: string;
}): Promise<void> {
	// Get params
	const { groupId, userId } = params;

	// Delete group-user join
	await db
		.delete(GroupUserTable)
		.where(and(eq(GroupUserTable.groupId, groupId), eq(GroupUserTable.userId, userId)));
}
