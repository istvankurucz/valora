import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { GroupSelect, GroupUpdate } from "../types/groupTypes";

export default async function updateGroup(id: string, data: GroupUpdate): Promise<GroupSelect> {
	// Update group
	const [group] = await db.update(GroupTable).set(data).where(eq(GroupTable.id, id)).returning();

	// Check group
	if (!group) throw new AppError({ message: "Error updating group." });

	// Return group
	return group;
}
