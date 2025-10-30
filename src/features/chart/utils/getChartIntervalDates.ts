import {
	eachDayOfInterval,
	eachMonthOfInterval,
	eachWeekOfInterval,
	eachYearOfInterval,
} from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";
import getDateRange from "./getDateRange";

export default function getChartIntervalDates(params: {
	interval: ChartInterval;
	date: Date;
	firstTransactionDate: Date;
}): Date[] {
	// Get params
	const { interval, date, firstTransactionDate } = params;

	// Get date range
	const dateRange = getDateRange(date, interval);

	// Return dates based on interval
	switch (interval) {
		case "day":
			return eachDayOfInterval(dateRange);
		case "week":
			return eachDayOfInterval(dateRange);
		case "month":
			return eachWeekOfInterval(dateRange, { weekStartsOn: 1 });
		case "year":
			return eachMonthOfInterval(dateRange);
		case "all":
			return eachYearOfInterval({ ...dateRange, start: firstTransactionDate });
	}
}
