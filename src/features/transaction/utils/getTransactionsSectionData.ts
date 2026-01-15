import sum from "@/src/utils/math/sum";
import { format } from "date-fns";
import { Transaction, TransactionsSectionData } from "../types/transactionTypes";
import groupTransactionsByInterval from "./groupTransactionsByInterval";

export default function getTransactionsSectionData(
	transactions: Transaction[],
	transactionLimit?: number
): TransactionsSectionData[] {
	// Group transactions by month
	const groupedTransactions = groupTransactionsByInterval(transactions, "month");

	// Calculate total income, expense and format title for each group
	let totalTransactions = 0;
	const sectionsData: TransactionsSectionData[] = [];

	for (const group of groupedTransactions) {
		const maxGroupTransactionCount = (transactionLimit ?? Infinity) - totalTransactions;
		const groupTransactionCount = Math.min(group.transactions.length, maxGroupTransactionCount);

		if (groupTransactionCount === 0) break;

		totalTransactions += groupTransactionCount;

		// Filter income and expense transactions
		const incomeTransactions = group.transactions.filter((t) => t.type === "income");
		const expenseTransactions = group.transactions.filter((t) => t.type === "expense");
		const income = sum(...incomeTransactions.map((t) => t.amount));
		const expense = sum(...expenseTransactions.map((t) => t.amount));

		// Create section data
		const sectionData: TransactionsSectionData = {
			title: format(
				group.interval,
				`MMMM${new Date().getFullYear() !== group.interval.getFullYear() ? " yyyy" : ""}`
			),
			data: group.transactions.slice(0, groupTransactionCount),
			income,
			expense,
			transactionCount: group.transactions.length,
		};

		// Add section data to sections array
		sectionsData.push(sectionData);
	}

	// Return sections data
	return sectionsData;
}
