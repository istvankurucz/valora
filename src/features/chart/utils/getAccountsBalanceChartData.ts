import sum from "@/src/utils/math/sum";
import { Account } from "../../account/types/accountTypes";
import { TransactionType } from "../../transaction/constants/transactionTypeOptions";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData, BarData, BarGroup } from "../types/chartTypes";
import getDateRange from "./getDateRange";

export default function getAccountsBalanceChartData(
	accounts: Account[],
	params: {
		interval: ChartInterval;
		date: Date;
		types: TransactionType[];
	}
): BarChartData {
	// Get params
	const { interval, date, types } = params;

	// Get date range
	const dateRange = getDateRange(date, interval);

	// Create groups
	const groups: BarGroup[] = accounts.map((account) => {
		// Filter transactions by date
		const filteredTransactions = account.transactions.filter(
			(transaction) =>
				new Date(transaction.timestamp) >= dateRange.start &&
				new Date(transaction.timestamp) <= dateRange.end
		);

		// Filter transactions by type
		const incomeTransactions = filteredTransactions.filter((t) => t.type === "income");
		const expenseTransactions = filteredTransactions.filter((t) => t.type === "expense");

		// Sum transactions
		const incomeSum = sum(...incomeTransactions.map((t) => t.amount));
		const expenseSum = sum(...expenseTransactions.map((t) => t.amount));

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
		return { label: account.name, bars };
	});

	// Return chart data
	return { groups };
}
