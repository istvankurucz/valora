import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BalanceChartData } from "../types/chartTypes";
import getChartDateRange from "./getChartDateRange";

export default function getBalanceChartData(
	transactions: Transaction[],
	params: { interval: ChartInterval; date: Date }
): BalanceChartData {
	// Get params
	const { interval, date } = params;

	// Get date range
	const dateRange = getChartDateRange(date, interval);

	// Filter transactions by date
	const filteredTransactions = transactions.filter(
		(transaction) =>
			new Date(transaction.timestamp) >= dateRange.start &&
			new Date(transaction.timestamp) <= dateRange.end
	);

	// Filter transactions by type
	const incomeTransactions = filteredTransactions.filter(
		(transaction) => transaction.type === "income"
	);
	const expenseTransactions = filteredTransactions.filter(
		(transaction) => transaction.type === "expense"
	);

	// Sum transactions
	const incomeSum = incomeTransactions.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);
	const expenseSum = expenseTransactions.reduce(
		(total, transaction) => total + transaction.amount,
		0
	);

	// Return chart data
	return {
		income: {
			value: incomeSum,
		},
		expense: {
			value: expenseSum,
		},
	};
}
