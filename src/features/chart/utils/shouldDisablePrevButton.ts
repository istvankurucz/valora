import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function shouldDisablePrevButton(
	date: Date,
	params: { interval: ChartInterval; firstTransactionDate: Date }
): boolean {
	// Get params
	const { interval, firstTransactionDate } = params;

	// Get previous date
	switch (interval) {
		case "day":
			return startOfDay(addDays(date, -1)) < startOfDay(firstTransactionDate);
		case "week":
			return startOfWeek(addWeeks(date, -1)) < startOfWeek(firstTransactionDate);
		case "month":
			return startOfMonth(addMonths(date, -1)) < startOfMonth(firstTransactionDate);
		case "year":
			return startOfYear(addYears(date, -1)) < startOfYear(firstTransactionDate);
		case "all":
			return true;
	}
}
