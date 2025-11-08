import { db } from "@/src/db/db";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { GroupUserInsert, GroupUserSelect } from "../types/groupTypes";

export default async function addUsersToGroup(
	groupId: string,
	userIds: string[]
): Promise<GroupUserSelect[]> {
	// Create data
	const data: GroupUserInsert[] = userIds.map((userId) => ({ groupId, userId }));

	// Create group users
	const groupUsers = await db.insert(GroupUserTable).values(data).returning();

	// Return group users
	return groupUsers;
}
