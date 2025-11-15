import sum from "@/src/utils/math/sum";
import { GroupUser } from "../../group/types/groupTypes";
import { TransactionType } from "../../transaction/constants/transactionTypeOptions";
import { Transaction } from "../../transaction/types/transactionTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData, BarData, BarGroup } from "../types/chartTypes";
import getDateRange from "./getDateRange";

export default function getGroupMembersBalanceChartData(
	transactions: Transaction[],
	params: {
		interval: ChartInterval;
		date: Date;
		members: GroupUser[];
		types: TransactionType[];
		relativeToMaximum: boolean;
	}
): BarChartData {
	// Get params
	const { interval, date, members, types, relativeToMaximum } = params;

	// Get date range
	const dateRange = getDateRange(date, interval);

	// Initialize maximum value for income and expense
	let maxIncome = 0;
	let maxExpense = 0;

	// Create groups
	let groups: BarGroup[] = members.map((member) => {
		// Filter transactions by date and user ID
		const filteredTransactions = transactions.filter(
			(transaction) =>
				new Date(transaction.timestamp) >= dateRange.start &&
				new Date(transaction.timestamp) <= dateRange.end &&
				transaction.user.id === member.id
		);

		// Filter transactions by type
		const incomeTransactions = filteredTransactions.filter((t) => t.type === "income");
		const expenseTransactions = filteredTransactions.filter((t) => t.type === "expense");

		// Sum transactions
		const incomeSum = sum(...incomeTransactions.map((t) => t.amount));
		const expenseSum = sum(...expenseTransactions.map((t) => t.amount));

		// Update maximums
		if (incomeSum > maxIncome) maxIncome = incomeSum;
		if (expenseSum > maxExpense) maxExpense = expenseSum;

		// Create bars data
		const bars: BarData[] = [];
		if (types.includes("income")) {
			bars.push({ value: incomeSum, type: "income", label: "Income" });
		}
		if (types.includes("expense")) {
			bars.push({
				value: expenseSum,
				type: "expense",
				label: "Expense",
			});
		}

		// Return group data
		return { label: member.name, bars };
	});

	// Adjust bars to be relative to maximum if required
	if (relativeToMaximum) {
		// Normalize bar values
		groups = groups.map((group) => {
			// Get bar values
			const expenseBar = group.bars.find((bar) => bar.type === "expense");
			const expenseValue = expenseBar ? expenseBar.value : 0;
			const incomeBar = group.bars.find((bar) => bar.type === "income");
			const incomeValue = incomeBar ? incomeBar.value : 0;
			const value = maxExpense - incomeValue - expenseValue;

			// Create new bars with normalized values
			const newBars: BarData[] = [
				{
					label: "Difference",
					type: value < 0 ? "income" : "expense",
					value: Math.abs(value),
				},
			];

			// Return updated group
			return { ...group, bars: newBars };
		});
	}

	// Return chart data
	return { groups };
}
