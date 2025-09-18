import getAccountData from "../../account/services/getAccountData";
import getGroupData from "../../group/services/getGroupData";
import getTransactionCategory from "../../transactionCategory/services/getTransactionCategory";
import getUser from "../../user/services/getUser";
import { Transaction, TransactionSelect } from "../types/transactionTypes";

export default async function getFullTransaction(
	transaction: TransactionSelect
): Promise<Transaction> {
	// Extract transaction properties
	const { categoryId, userId, accountId, groupId, ...transactionRest } = transaction;

	// Get transaction details
	const category = await getTransactionCategory(categoryId);
	const user = await getUser(userId);
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
