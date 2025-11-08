import { db } from "@/src/db/db";
import { GroupSelect } from "../types/groupTypes";

export default async function getRawGroups(): Promise<GroupSelect[]> {
	const groups = await db.query.GroupTable.findMany({
		orderBy: (group, { desc }) => [desc(group.createdAt)],
	});
	return groups;
}
