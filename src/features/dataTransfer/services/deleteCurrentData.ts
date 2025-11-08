import deleteAccounts from "../../account/services/deleteAccounts";
import deleteGroups from "../../group/services/deleteGroups";
import deleteGroupUsers from "../../group/services/deleteGroupUsers";
import deleteIcons from "../../icon/services/deleteIcons";
import deleteTransactions from "../../transaction/services/deleteTransactions";
import deleteTransactionCategories from "../../transactionCategory/services/deleteTransactionCategories";
import deleteUsers from "../../user/services/deleteUsers";

export default async function deleteCurrentData(): Promise<void> {
	await Promise.all([
		deleteTransactions(),
		deleteTransactionCategories(),
		deleteAccounts(),
		deleteGroups(),
		deleteGroupUsers(),
		deleteUsers(),
		deleteIcons(),
	]);
}
