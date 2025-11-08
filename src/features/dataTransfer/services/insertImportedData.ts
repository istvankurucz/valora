import createAccounts from "../../account/services/createAccounts";
import createGroups from "../../group/services/createGroups";
import createGroupUsers from "../../group/services/createGroupUsers";
import createIcons from "../../icon/services/createIcons";
import createTransactions from "../../transaction/services/createTransactions";
import createTransactionCategories from "../../transactionCategory/services/createTransactionCategories";
import createUsers from "../../user/services/createUsers";
import { DataTransferData } from "../types/dataTransferTypes";

export default async function insertImportedData(data: DataTransferData): Promise<void> {
	await Promise.all([
		createUsers(data.users),
		createIcons(data.icons),
		createAccounts(data.accounts),
		createGroups(data.groups),
		createGroupUsers(data.groupUsers),
		createTransactionCategories(data.transactionCategories),
		createTransactions(data.transactions),
	]);
}
