import { addDays, addMonths, addWeeks, addYears, isAfter } from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function shouldDisableNextButton(
	date: Date,
	params: { interval: ChartInterval }
): boolean {
	// Get params
	const { interval } = params;

	// Get next date
	let nextDate: Date;
	switch (interval) {
		case "day":
			nextDate = addDays(date, 1);
			break;
		case "week":
			nextDate = addWeeks(date, 1);
			break;
		case "month":
			nextDate = addMonths(date, 1);
			break;
		case "year":
			nextDate = addYears(date, 1);
			break;
		case "all":
			return true;
	}

	// Return result
	return isAfter(nextDate, new Date());
}
