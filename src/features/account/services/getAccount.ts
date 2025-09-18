import getTransactionsByAccountId from "../../transaction/services/getTransactionsByAccountId";
import { Account } from "../types/accountTypes";
import getAccountData from "./getAccountData";

export default async function getAccount(id: string): Promise<Account> {
	// Get account
	const accountData = await getAccountData(id);

	// Get transactions
	const transactions = await getTransactionsByAccountId(id);

	// Return account
	return { ...accountData, transactions };
}
