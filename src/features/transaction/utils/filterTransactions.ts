import { INITIAL_DATE } from "@/src/constants/initialDate";
import { endOfDay, startOfDay } from "date-fns";
import { FilterTransactionsFormData } from "../constants/formData";
import { Transaction } from "../types/transactionTypes";

export default function filterTransactions(
	transactions: Transaction[],
	filterData: FilterTransactionsFormData
): Transaction[] {
	// Type
	const f1 = transactions.filter((transaction) => filterData.types.includes(transaction.type));

	// Category
	const f2 =
		filterData.categoryIds.length > 0
			? f1.filter((transaction) => filterData.categoryIds.includes(transaction.category.id))
			: f1;

	// Start date
	const f3 =
		filterData.startDate !== INITIAL_DATE
			? f2.filter(
					(transaction) => endOfDay(new Date(transaction.timestamp)) >= filterData.startDate
			  )
			: f2;
	// Start date
	const f4 =
		filterData.endDate !== INITIAL_DATE
			? f3.filter(
					(transaction) => startOfDay(new Date(transaction.timestamp)) <= filterData.endDate
			  )
			: f3;

	// Groups
	const f5 =
		filterData.groupIds.length > 0
			? f4.filter(
					(transaction) =>
						transaction.group && filterData.groupIds.includes(transaction.group.id)
			  )
			: f4;

	// Accounts
	const f6 =
		filterData.accountIds.length > 0
			? f5.filter(
					(transaction) =>
						transaction.account && filterData.accountIds.includes(transaction.account.id)
			  )
			: f5;

	// Search text
	const f7 =
		filterData.searchText !== ""
			? f6.filter((transaction) =>
					transaction.label.toLowerCase().includes(filterData.searchText.toLowerCase())
			  )
			: f6;

	// Return filtered transactions
	return f7;
}
