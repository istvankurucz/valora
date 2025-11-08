import { db } from "@/src/db/db";
import { UserSelect } from "../types/userTypes";

export default async function getRawUsers(): Promise<UserSelect[]> {
	const users = await db.query.UserTable.findMany({
		orderBy: (user, { desc }) => [desc(user.createdAt)],
	});
	return users;
}
