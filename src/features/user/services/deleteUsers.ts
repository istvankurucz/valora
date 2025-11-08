import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";

export default async function deleteUsers(): Promise<void> {
	await db.delete(UserTable);
}
