import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { eq } from "drizzle-orm";

export default async function deleteGroup(id: string): Promise<void> {
	// Delete group
	await db.delete(GroupTable).where(eq(GroupTable.id, id));
}
