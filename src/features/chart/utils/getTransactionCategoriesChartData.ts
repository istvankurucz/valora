import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import { TransactionCategoryData } from "@/src/features/transactionCategory/types/transactionCategoryTypes";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { TransactionCategoriesChartData } from "../types/chartTypes";
import getChartDateRange from "./getChartDateRange";

export default function getTransactionCategoriesChartData(
	transactions: Transaction[],
	params: {
		interval: ChartInterval;
		date: Date;
		transactionTypes: TransactionType[];
		categories: TransactionCategoryData[];
	}
): TransactionCategoriesChartData[] {
	// Get params
	const { interval, date, transactionTypes, categories } = params;

	// Filter categories by transaction type
	const filteredCategories = categories.filter((category) =>
		transactionTypes.includes(category.type)
	);

	// Get date range
	const dateRange = getChartDateRange(date, interval);

	// Filter transactions by date
	const filteredTransactions = transactions.filter(
		(transaction) =>
			new Date(transaction.timestamp) >= dateRange.start &&
			new Date(transaction.timestamp) <= dateRange.end
	);

	// Filter transactions by category
	const categoryTransactions = filteredCategories.map((category) => {
		const transactions = filteredTransactions.filter(
			(transaction) => transaction.category.id === category.id
		);
		return { category, transactions };
	});

	// Create chart data
	return categoryTransactions.map((category) => {
		// Sum transactions
		const sum = category.transactions.reduce(
			(total, transaction) => total + transaction.amount,
			0
		);

		return {
			type: category.category.type,
			label: category.category.name,
			value: sum,
		};
	});
}
