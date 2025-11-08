import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { GroupInsert, GroupSelect } from "../types/groupTypes";

export default async function createGroups(data: GroupInsert[]): Promise<GroupSelect[]> {
	const groups = await db.insert(GroupTable).values(data).returning();
	return groups;
}
