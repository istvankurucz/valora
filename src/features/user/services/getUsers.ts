import { db } from "@/src/db/db";
import getGroupsByUserId from "../../group/services/getGroupsByUserId";
import { User } from "../types/userTypes";

export default async function getUsers(): Promise<User[]> {
	// Get users (exluding admin)
	const usersData = await db.query.UserTable.findMany({
		columns: {
			id: true,
			name: true,
			admin: true,
		},
		where: (user, { not, eq }) => not(eq(user.admin, true)),
		orderBy: (user, { asc }) => asc(user.createdAt),
	});

	// Get groups for each user
	const users = await Promise.all(
		usersData.map(async (user) => {
			const groups = await getGroupsByUserId(user.id);
			return { ...user, groups };
		})
	);

	// Return user
	return users;
}
