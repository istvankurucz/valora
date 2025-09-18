import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import AppError from "../../error/classes/AppError";
import { GroupInsert, GroupSelect } from "../types/groupTypes";

export default async function createGroup(data: GroupInsert): Promise<GroupSelect> {
	// Create group
	const [group] = await db.insert(GroupTable).values(data).returning();

	// Check group
	if (!group) throw new AppError({ message: "Error creating group." });

	// Return group
	return group;
}
