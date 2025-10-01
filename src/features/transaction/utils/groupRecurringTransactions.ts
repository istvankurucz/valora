import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import { startOfDay, startOfToday } from "date-fns";
import { Transaction } from "../types/transactionTypes";

export default function groupRecurringTransactions(transactions: Transaction[]): {
	today: Transaction[];
	upcoming: Transaction[];
	past: Transaction[];
} {
	const today = transactions.filter(
		(transaction) =>
			transaction.recurring &&
			startOfDay(
				getNextTransactionDate(new Date(transaction.timestamp), transaction.recurring)
			).getTime() === startOfToday().getTime()
	);

	const upcoming = transactions.filter(
		(transaction) =>
			transaction.recurring &&
			startOfDay(
				getNextTransactionDate(new Date(transaction.timestamp), transaction.recurring)
			) > startOfToday()
	);

	const past = transactions.filter(
		(transaction) =>
			transaction.recurring &&
			startOfDay(
				getNextTransactionDate(new Date(transaction.timestamp), transaction.recurring)
			) < startOfToday()
	);

	return { today, upcoming, past };
}
