import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import { UserInsert, UserSelect } from "../types/userTypes";

export default async function createUsers(data: UserInsert[]): Promise<UserSelect[]> {
	const users = await db.insert(UserTable).values(data).returning();
	return users;
}
