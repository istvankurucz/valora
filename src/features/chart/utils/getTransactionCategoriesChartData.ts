import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import { TransactionCategoryData } from "@/src/features/transactionCategory/types/transactionCategoryTypes";
import sum from "@/src/utils/math/sum";
import { ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData, BarGroup } from "../types/chartTypes";
import getDateRange from "./getDateRange";

export default function getTransactionCategoriesChartData(
	transactions: Transaction[],
	params: {
		interval: ChartInterval;
		date: Date;
		transactionTypes: TransactionType[];
		categories: TransactionCategoryData[];
	}
): BarChartData {
	// Get params
	const { interval, date, transactionTypes, categories } = params;

	// Filter categories by transaction type
	const filteredCategories = categories.filter((category) =>
		transactionTypes.includes(category.type)
	);

	// Get date range
	const dateRange = getDateRange(date, interval);

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

	// Create groups
	const groups: BarGroup[] = categoryTransactions.map((category) => {
		// Sum transactions
		const value = sum(...category.transactions.map((t) => t.amount));

		// Return group data
		return {
			label: category.category.name,
			bars: [{ value, type: category.category.type, label: category.category.name }],
		};
	});

	// Return chart data
	return { groups };
}
