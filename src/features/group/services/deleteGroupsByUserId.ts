import { db } from "@/src/db/db";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { eq } from "drizzle-orm";

export default async function deleteGroupsByUserId(userId: string): Promise<void> {
	// Delete group-user joins
	await db.delete(GroupUserTable).where(eq(GroupUserTable.userId, userId));
}
