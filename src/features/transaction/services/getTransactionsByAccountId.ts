import { db } from "@/src/db/db";
import getAccountData from "../../account/services/getAccountData";
import getGroupData from "../../group/services/getGroupData";
import getTransactionCategory from "../../transactionCategory/services/getTransactionCategory";
import getUser from "../../user/services/getUser";
import { Transaction } from "../types/transactionTypes";

export default async function getTransactionsByAccountId(
	accountId: string
): Promise<Transaction[]> {
	// Get transactions
	const transactionDatas = await db.query.TransactionTable.findMany({
		where: (transaction, { eq }) => eq(transaction.accountId, accountId),
		orderBy: (transaction, { desc }) => desc(transaction.timestamp),
	});

	// Get transaction category
	const transactionsWithCategory = await Promise.all(
		transactionDatas.map(async (transaction) => {
			const category = await getTransactionCategory(transaction.categoryId);
			const { categoryId, ...restTransaction } = transaction;
			return { ...restTransaction, category };
		})
	);

	// Get transaction user
	const transactionsWithUser = await Promise.all(
		transactionsWithCategory.map(async (transaction) => {
			const user = await getUser(transaction.userId);
			const { userId, ...transactionRest } = transaction;
			return { ...transactionRest, user };
		})
	);

	// Get transaction account
	const transactionsWithAccount = await Promise.all(
		transactionsWithUser.map(async (transaction) => {
			const { accountId, ...transactionRest } = transaction;
			if (!accountId) return { ...transactionRest, account: null };
			const account = await getAccountData(accountId);
			return { ...transactionRest, account };
		})
	);

	// Get transaction group
	const transactionWithGroups = await Promise.all(
		transactionsWithAccount.map(async (transaction) => {
			const { groupId, ...transactionRest } = transaction;
			if (!groupId) return { ...transactionRest, group: null };
			const group = await getGroupData(groupId);
			return { ...transactionRest, group };
		})
	);

	// Return transactions
	return transactionWithGroups;
}
