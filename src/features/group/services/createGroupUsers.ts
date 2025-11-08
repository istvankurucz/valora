import { db } from "@/src/db/db";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { GroupUserInsert, GroupUserSelect } from "../types/groupTypes";

export default async function createGroupUsers(
	data: GroupUserInsert[]
): Promise<GroupUserSelect[]> {
	const groupUsers = await db.insert(GroupUserTable).values(data).returning();
	return groupUsers;
}
