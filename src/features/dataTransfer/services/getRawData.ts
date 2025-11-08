import getRawAccounts from "../../account/services/getRawAccounts";
import getRawGroupUsers from "../../group/services/getRawGroupUsers";
import getRawGroups from "../../group/services/getRawGroups";
import getRawIcons from "../../icon/services/getRawIcons";
import getRawTransactions from "../../transaction/services/getRawTransactions";
import getRawTransactionCategories from "../../transactionCategory/services/getRawTransactionCategories";
import getRawUsers from "../../user/services/getRawUsers";
import { DataTransferData } from "../types/dataTransferTypes";

export default async function getRawData(): Promise<DataTransferData> {
	// Get data from various tables
	const users = await getRawUsers();
	const accounts = await getRawAccounts();
	const transactions = await getRawTransactions();
	const transactionCategories = await getRawTransactionCategories();
	const groups = await getRawGroups();
	const groupUsers = await getRawGroupUsers();
	const icons = await getRawIcons();

	// Return the aggregated data
	return {
		users,
		accounts,
		transactions,
		transactionCategories,
		groups,
		groupUsers,
		icons,
	};
}
