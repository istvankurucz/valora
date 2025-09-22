import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { IconTable } from "@/src/db/schemas/Icon";
import { eq } from "drizzle-orm";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import { GroupData } from "../types/groupTypes";

export default async function getGroupsByUserId(userId: string): Promise<GroupData[]> {
	// Get groups
	const groups = await db
		.select({
			id: GroupTable.id,
			name: GroupTable.name,
			updatedAt: GroupTable.updatedAt,
			createdAt: GroupTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(GroupTable)
		.innerJoin(GroupUserTable, eq(GroupUserTable.groupId, GroupTable.id))
		.innerJoin(IconTable, eq(GroupTable.iconId, IconTable.id))
		.where(eq(GroupUserTable.userId, userId));

	// Return groups
	return groups;
}
