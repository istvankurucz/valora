import getTransactionsByGroupId from "../../transaction/services/getTransactionsByGroupId";
import { Group } from "../types/groupTypes";
import getGroupData from "./getGroupData";
import getGroupUsersByGroupId from "./getGroupUsersByGroupId";

export default async function getGroup(id: string): Promise<Group> {
	// Get group data
	const groupData = await getGroupData(id);

	// Get group details
	const transactions = await getTransactionsByGroupId(id);
	const users = await getGroupUsersByGroupId(id);

	// Return group
	return { ...groupData, transactions, users };
}
