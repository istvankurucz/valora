import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";

export default async function deleteGroups(): Promise<void> {
	await db.delete(GroupTable);
}
