import sum from "@/src/utils/math/sum";
import { TransactionType } from "../../transaction/constants/transactionTypeOptions";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData, BarGroup } from "../types/chartTypes";
import formatBalanceBreakdownChartLabel from "./formatBalanceBreakdownChartLabel";
import getChartIntervalDates from "./getChartIntervalDates";

import capitalizeString from "@/src/utils/string/capitalizeString";
import getIntervalBreakdownRange from "./getIntervalBreakdownRange";

export default function getTransactionCategoryChartData(
	transactions: Transaction[],
	params: {
		categoryType: TransactionType;
		interval: ChartInterval;
		date: Date;
		firstTransactionDate: Date;
	}
): BarChartData {
	// Get params
	const { categoryType, interval, date, firstTransactionDate } = params;

	// Create interval dates
	const dates = getChartIntervalDates({ interval, date, firstTransactionDate });

	// Create groups
	const groups: BarGroup[] = dates.map((d) => {
		// Get date range for the specific date
		const dateRange = getIntervalBreakdownRange(interval, date, d);

		// Filter transactions by date range
		const filteredTransactions = transactions.filter(
			(t) =>
				new Date(t.timestamp) >= dateRange.start &&
				new Date(t.timestamp) <= dateRange.end &&
				t.type === categoryType
		);

		// Sum transactions
		const total = sum(...filteredTransactions.map((t) => t.amount));

		// Return group data
		return {
			label: formatBalanceBreakdownChartLabel(dateRange.end, interval),
			bars: [{ value: total, type: categoryType, label: capitalizeString(categoryType) }],
		};
	});

	// Return chart data
	return { groups };
}
