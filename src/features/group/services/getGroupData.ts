import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { IconTable } from "@/src/db/schemas/Icon";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import { GroupData } from "../types/groupTypes";

export default async function getGroupData(id: string): Promise<GroupData> {
	// Get group
	const [group] = await db
		.select({
			id: GroupTable.id,
			name: GroupTable.name,
			updatedAt: GroupTable.updatedAt,
			createdAt: GroupTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(GroupTable)
		.innerJoin(IconTable, eq(GroupTable.iconId, IconTable.id))
		.where(eq(GroupTable.id, id));

	// Check group
	if (!group) throw new AppError({ message: "Group not found." });

	// Return group
	return group;
}
