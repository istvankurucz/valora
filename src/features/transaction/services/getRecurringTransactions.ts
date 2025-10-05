import { db } from "@/src/db/db";
import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { RecurringTransaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

export default async function getRecurringTransactions(): Promise<RecurringTransaction[]> {
	// Get transactions
	const transactionsSelect = await db.query.TransactionTable.findMany({
		where: (transaction, { isNotNull, and, isNull }) =>
			and(isNotNull(transaction.recurring), isNull(transaction.nextTransactionAddedAt)),
		orderBy: (transaction, { asc }) => asc(transaction.timestamp),
	});

	// Filter transactions that are between start and end date
	const startDate = startOfDay(subDays(new Date(), 5));
	const endDate = endOfDay(addDays(new Date(), 5));
	const filteredTransactions = transactionsSelect.filter((transaction) => {
		const nextDate = getNextTransactionDate(
			new Date(transaction.timestamp),
			transaction.recurring!
		);

		return nextDate >= startDate && nextDate <= endDate;
	});

	// Get full transaction
	const transactions = await Promise.all(
		filteredTransactions.map(async (transaction) => await getTransactionDetails(transaction))
	);

	// Return transactions
	return transactions as RecurringTransaction[];
}
