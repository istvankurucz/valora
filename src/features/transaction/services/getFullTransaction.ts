import getAccountData from "../../account/services/getAccountData";
import getGroupData from "../../group/services/getGroupData";
import getTransactionCategoryData from "../../transactionCategory/services/getTransactionCategoryData";
import getUserData from "../../user/services/getUserData";
import { Transaction, TransactionSelect } from "../types/transactionTypes";

export default async function getFullTransaction(
	transaction: TransactionSelect
): Promise<Transaction> {
	// Extract transaction properties
	const { categoryId, userId, accountId, groupId, ...transactionRest } = transaction;

	// Get transaction details
	const category = await getTransactionCategoryData(categoryId);
	const user = await getUserData(userId);
	const account = accountId ? await getAccountData(accountId) : null;
	const group = groupId ? await getGroupData(groupId) : null;

	// Return transaction
	return {
		...transactionRest,
		category,
		user,
		account,
		group,
	};
}
