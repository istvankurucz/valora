import { Account } from "../../account/types/accountTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { AccountBalanceChartData } from "../types/chartTypes";
import getChartDateRange from "./getChartDateRange";

export default function getAccountsBalanceChartData(
	accounts: Account[],
	params: { interval: ChartInterval; date: Date }
): AccountBalanceChartData[] {
	// Get params
	const { interval, date } = params;

	// Get date range
	const dateRange = getChartDateRange(date, interval);

	// Create chart data
	return accounts.map((account) => {
		// Filter transactions by date
		const filteredTransactions = account.transactions.filter(
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

		return {
			label: account.name,
			income: { value: incomeSum },
			expense: { value: expenseSum },
		};
	});
}
