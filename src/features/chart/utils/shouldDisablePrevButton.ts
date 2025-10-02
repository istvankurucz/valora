import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "date-fns";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function shouldDisablePrevButton(
	date: Date,
	params: { interval: ChartInterval; transactions: Transaction[] }
): boolean {
	// Get params
	const { interval, transactions } = params;

	// Get first transaction date
	if (transactions.length === 0) return true;
	const firstTransactionDate = new Date(
		transactions.reduce((earliest, transaction) => {
			return transaction.timestamp < earliest ? transaction.timestamp : earliest;
		}, transactions[0]!.timestamp)
	);

	// Get previous date
	switch (interval) {
		case "day":
			return startOfDay(addDays(date, -1)) < startOfDay(firstTransactionDate);
		case "week":
			return startOfWeek(addWeeks(date, -1)) < startOfWeek(firstTransactionDate);
		case "month":
			return startOfMonth(addMonths(date, -1)) < startOfMonth(firstTransactionDate);
		case "year":
			return startOfYear(addYears(date, -1)) < startOfYear(firstTransactionDate);
		case "all":
			return true;
	}
}
