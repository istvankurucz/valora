import { FilterTransactionsFormData } from "../constants/formData";
import { Transaction } from "../types/transactionTypes";

export default function sortTransactions(
	transactions: Transaction[],
	sortData: FilterTransactionsFormData
): Transaction[] {
	switch (sortData.sortProperty) {
		case "timestamp":
			return [...transactions].sort((a, b) => {
				if (a.timestamp > b.timestamp) return sortData.sortAsc ? 1 : -1;
				if (a.timestamp < b.timestamp) return sortData.sortAsc ? -1 : 1;
				return 0;
			});
		case "amount":
			return [...transactions].sort((a, b) => {
				if (a.amount > b.amount) return sortData.sortAsc ? 1 : -1;
				if (a.amount < b.amount) return sortData.sortAsc ? -1 : 1;
				return 0;
			});
		default:
			return transactions;
	}
}
