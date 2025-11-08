import { db } from "@/src/db/db";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";

export default async function deleteGroupUsers(): Promise<void> {
	await db.delete(GroupUserTable);
}
