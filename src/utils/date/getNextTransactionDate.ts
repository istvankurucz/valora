import { TransactionRecurring } from "@/src/features/transaction/constants/transactionRecurringOptions";
import { addDays, addMonths, addWeeks, addYears } from "date-fns";

export default function getNextTransactionDate(date: Date, interval: TransactionRecurring): Date {
	switch (interval) {
		case "daily":
			return addDays(date, 1);
		case "weekly":
			return addWeeks(date, 1);
		case "monthly":
			return addMonths(date, 1);
		case "yearly":
			return addYears(date, 1);
	}
}
