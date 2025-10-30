import { Transaction } from "../types/transactionTypes";

export default function getFirstTransactionDate(transactions: Transaction[]): Date {
	return transactions.reduce((first, transaction) => {
		const transactionDate = new Date(transaction.timestamp);
		return transactionDate < first ? transactionDate : first;
	}, new Date());
}
