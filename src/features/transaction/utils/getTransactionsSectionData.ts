import sum from "@/src/utils/math/sum";
import { format } from "date-fns";
import { Transaction, TransactionsSectionData } from "../types/transactionTypes";
import groupTransactionsByInterval from "./groupTransactionsByInterval";

export default function getTransactionsSectionData(
	transactions: Transaction[]
): TransactionsSectionData[] {
	// Group transactions by month
	const groupedTransactions = groupTransactionsByInterval(transactions, "month");

	// Calculate total income, expense and format title for each group
	const sectionsData: TransactionsSectionData[] = groupedTransactions.map((group) => {
		// Filter income and expense transactions
		const incomeTransactions = group.transactions.filter((t) => t.type === "income");
		const expenseTransactions = group.transactions.filter((t) => t.type === "expense");
		const income = sum(...incomeTransactions.map((t) => t.amount));
		const expense = sum(...expenseTransactions.map((t) => t.amount));

		// Create section data
		return {
			title: format(
				group.interval,
				`MMMM${new Date().getFullYear() !== group.interval.getFullYear() ? " yyyy" : ""}`
			),
			data: group.transactions,
			income,
			expense,
		};
	});

	// Return sections data
	return sectionsData;
}
