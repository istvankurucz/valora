import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function shouldDisablePrevButton(
	date: Date,
	params: { interval: ChartInterval; transactions: Transaction[] }
): boolean {
	// Get params
	const { interval, transactions } = params;

	// Get previous date
	let prevDate: Date;
	switch (interval) {
		case "day":
			prevDate = addDays(date, -1);
			break;
		case "week":
			prevDate = addWeeks(date, -1);
			break;
		case "month":
			prevDate = addMonths(date, -1);
			break;
		case "year":
			prevDate = addYears(date, -1);
			break;
		case "all":
			return true;
	}

	// Get first transaction date
	if (transactions.length === 0) return true;
	const firstTransactionDate = transactions.reduce((earliest, transaction) => {
		return transaction.timestamp < earliest ? transaction.timestamp : earliest;
	}, transactions[0]!.timestamp);

	// Return result
	return prevDate < new Date(firstTransactionDate);
}
