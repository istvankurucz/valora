import { endOfMonth, startOfMonth } from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";
import getDateRange from "./getDateRange";

export default function getIntervalBreakdownRange(
	interval: ChartInterval,
	globalDate: Date,
	intervalDate: Date
): { start: Date; end: Date } {
	// Get new interval
	let dateInterval: ChartInterval = interval;
	switch (interval) {
		case "day":
			dateInterval = "day";
			break;
		case "week":
			dateInterval = "day";
			break;
		case "month":
			dateInterval = "week";
			break;
		case "year":
			dateInterval = "month";
			break;
		case "all":
			dateInterval = "year";
	}

	// Get date range for the specific date
	const dateRange = getDateRange(intervalDate, dateInterval);

	// Check date range in case of "week" interval
	if (dateInterval === "week") {
		if (dateRange.start < startOfMonth(globalDate)) dateRange.start = startOfMonth(globalDate);
		if (dateRange.end > endOfMonth(globalDate)) dateRange.end = endOfMonth(globalDate);
	}

	// Return date range
	return dateRange;
}
