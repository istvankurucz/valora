import { GroupUser } from "../../group/types/groupTypes";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { GroupMembersBalanceChartData } from "../types/chartTypes";
import getChartDateRange from "./getChartDateRange";

export default function getGroupMembersBalanceChartData(
	transactions: Transaction[],
	params: { interval: ChartInterval; date: Date; members: GroupUser[] }
): GroupMembersBalanceChartData[] {
	// Get params
	const { interval, date, members } = params;

	// Get date range
	const dateRange = getChartDateRange(date, interval);

	// Create chart data
	return members.map((member) => {
		// Filter transactions by date and user ID
		const filteredTransactions = transactions.filter(
			(transaction) =>
				new Date(transaction.timestamp) >= dateRange.start &&
				new Date(transaction.timestamp) <= dateRange.end &&
				transaction.user.id === member.id
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
			name: member.name,
			income: { value: incomeSum },
			expense: { value: expenseSum },
		};
	});
}
