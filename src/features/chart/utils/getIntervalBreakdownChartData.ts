import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import sum from "@/src/utils/math/sum";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData, BarGroup } from "../types/chartTypes";
import formatBalanceBreakdownChartLabel from "./formatBalanceBreakdownChartLabel";
import getChartIntervalDates from "./getChartIntervalDates";
import getIntervalBreakdownRange from "./getIntervalBreakdownRange";

export default function getIntervalBreakdownChartData(
	transactions: Transaction[],
	params: { interval: ChartInterval; date: Date; firstTransactionDate: Date }
): BarChartData {
	// Get params
	const { interval, date, firstTransactionDate } = params;

	// Create interval dates
	const dates = getChartIntervalDates({ interval, date, firstTransactionDate });

	// Create groups
	const groups: BarGroup[] = dates.map((d) => {
		// Get date range for the specific date
		const dateRange = getIntervalBreakdownRange(interval, date, d);

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

		// Return group data
		return {
			label: formatBalanceBreakdownChartLabel(dateRange.end, interval),
			bars: [
				{ value: incomeSum, type: "income", label: "Income" },
				{ value: expenseSum, type: "expense", label: "Expense" },
			],
		};
	});

	// Return chart data
	return { groups };
}
