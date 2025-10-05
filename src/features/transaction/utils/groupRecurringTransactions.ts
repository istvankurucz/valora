import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import { startOfDay, startOfToday } from "date-fns";
import { RecurringTransaction } from "../types/transactionTypes";

export default function groupRecurringTransactions(transactions: RecurringTransaction[]): {
	today: RecurringTransaction[];
	upcoming: RecurringTransaction[];
	past: RecurringTransaction[];
} {
	// Initialize groups
	const today: RecurringTransaction[] = [];
	const upcoming: RecurringTransaction[] = [];
	const past: RecurringTransaction[] = [];

	// Get start of today
	const todayStart = startOfToday().getTime();

	// Group transactions by their next occurrence date
	transactions.forEach((transaction) => {
		// Get start of next occurrence date
		const nextDateStart = startOfDay(
			getNextTransactionDate(new Date(transaction.timestamp), transaction.recurring)
		).getTime();

		// Compare dates and group accordingly
		if (nextDateStart === todayStart) today.push(transaction);
		else if (nextDateStart > todayStart) upcoming.push(transaction);
		else past.push(transaction);
	});

	return { today, upcoming, past };
}
