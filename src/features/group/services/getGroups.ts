import { db } from "@/src/db/db";
import { GroupTable } from "@/src/db/schemas/Group";
import { IconTable } from "@/src/db/schemas/Icon";
import { desc, eq } from "drizzle-orm";
import { ICON_COLUMNS } from "../../icon/constants/iconDbColumns";
import getTransactionsByGroupId from "../../transaction/services/getTransactionsByGroupId";
import sortItemsByLatestTransaction from "../../transaction/utils/sortItemsByLatestTransaction";
import { Group } from "../types/groupTypes";
import getGroupUsersByGroupId from "./getGroupUsersByGroupId";

export default async function getGroups(): Promise<Group[]> {
	// Get groups
	const groupDatas = await db
		.select({
			id: GroupTable.id,
			name: GroupTable.name,
			updatedAt: GroupTable.updatedAt,
			createdAt: GroupTable.createdAt,
			icon: ICON_COLUMNS,
		})
		.from(GroupTable)
		.innerJoin(IconTable, eq(GroupTable.iconId, IconTable.id))
		.orderBy(desc(GroupTable.createdAt));

	// Get transactions
	const groupsFull = await Promise.all(
		groupDatas.map(async (group) => {
			const transactions = await getTransactionsByGroupId(group.id);
			const users = await getGroupUsersByGroupId(group.id);
			return { ...group, transactions, users };
		})
	);

	// Sort groups by latest transaction
	const groups = sortItemsByLatestTransaction(groupsFull);

	// Return groups
	return groups;
}
