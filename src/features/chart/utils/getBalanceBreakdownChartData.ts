import sum from "@/src/utils/math/sum";
import { endOfMonth, startOfMonth } from "date-fns";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BalanceBreakdownChartData } from "../types/chartTypes";
import formatBalanceBreakdownChartLabel from "./formatBalanceBreakdownChartLabel";
import getChartIntervalDates from "./getChartIntervalDates";
import getDateRange from "./getDateRange";

export default function getBalanceBreakdownChartData(
	transactions: Transaction[],
	options: { interval: ChartInterval; date: Date }
): BalanceBreakdownChartData[] {
	// Get options
	const { interval, date } = options;

	// Create interval dates
	const dates = getChartIntervalDates(options);

	// Create chart data
	const chartData: BalanceBreakdownChartData[] = dates.map((d) => {
		// Get new interval
		let dateInterval: ChartInterval = interval;
		switch (interval) {
			case "day":
				dateInterval = "day";
				break;
			case "week":
				dateInterval = "day";
				break;
			case "month":
				dateInterval = "week";
				break;
			case "year":
				dateInterval = "month";
				break;
			case "all":
				dateInterval = "year";
		}

		// Get date range for the specific date
		const dateRange = getDateRange(d, dateInterval);

		// Check date range in case of "week" interval
		if (dateInterval === "week") {
			if (dateRange.start < startOfMonth(date)) dateRange.start = startOfMonth(date);
			if (dateRange.end > endOfMonth(date)) dateRange.end = endOfMonth(date);
		}

		// Filter transactions by date range
		const filteredTransactions = transactions.filter(
			(t) => new Date(t.timestamp) >= dateRange.start && new Date(t.timestamp) <= dateRange.end
		);

		// Filter transactions by type
		const incomeTransactions = filteredTransactions.filter((t) => t.type === "income");
		const expenseTransactions = filteredTransactions.filter((t) => t.type === "expense");

		// Sum transactions
		const incomeSum = sum(...incomeTransactions.map((t) => t.amount));
		const expenseSum = sum(...expenseTransactions.map((t) => t.amount));

		// Return chart data item
		return {
			label: formatBalanceBreakdownChartLabel(dateRange.end, interval),
			income: { value: incomeSum },
			expense: { value: expenseSum },
		};
	});

	// Return chart data
	return chartData;
}
