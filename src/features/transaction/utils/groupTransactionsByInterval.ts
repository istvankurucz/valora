import { ChartInterval } from "../../chart/constants/chartIntervalOptions";
import getDateRange from "../../chart/utils/getDateRange";
import { IntervalTransactions, Transaction } from "../types/transactionTypes";

export default function groupTransactionsByInterval(
	transactions: Transaction[],
	interval: ChartInterval
): IntervalTransactions[] {
	// Initialize grouped transactions array
	const groups: IntervalTransactions[] = [];

	// Add transactions to groups
	transactions.forEach((transaction) => {
		// Get date range of transaction timestamp
		const dateRange = getDateRange(new Date(transaction.timestamp), interval);

		// Get group based on start of date range
		const group = groups.find((group) => group.interval.getTime() === dateRange.start.getTime());

		// Check group
		if (group) {
			// Add transaction to existing group
			group.transactions.push(transaction);
		} else {
			// Create new group
			groups.push({
				interval: dateRange.start,
				transactions: [transaction],
			});
		}
	});

	// Sort groups by interval date in descending order
	groups.sort((a, b) => b.interval.getTime() - a.interval.getTime());

	// Return groups
	return groups;
}
