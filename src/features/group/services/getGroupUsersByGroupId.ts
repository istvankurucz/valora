import { db } from "@/src/db/db";
import { GroupUser } from "../types/groupTypes";

export default async function getGroupUsersByGroupId(groupId: string): Promise<GroupUser[]> {
	// Get users
	const usersRaw = await db.query.GroupUserTable.findMany({
		columns: {
			groupId: false,
			userId: false,
		},
		with: {
			user: {
				columns: {
					currency: false,
					updatedAt: false,
					createdAt: false,
				},
			},
		},
		where: (record, { eq }) => eq(record.groupId, groupId),
		orderBy: (record, { desc }) => desc(record.addedAt),
	});

	// Format users
	const users = usersRaw.map((user) => ({ ...user.user, addedAt: user.addedAt }));

	// Return user
	return users;
}
