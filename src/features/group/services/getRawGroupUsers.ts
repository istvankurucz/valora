import { db } from "@/src/db/db";
import { GroupUserSelect } from "../types/groupTypes";

export default async function getRawGroupUsers(): Promise<GroupUserSelect[]> {
	const groupUsers = await db.query.GroupUserTable.findMany({
		orderBy: (groupUser, { desc }) => [desc(groupUser.addedAt)],
	});
	return groupUsers;
}
