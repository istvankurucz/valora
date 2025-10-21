import {
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function getDateRange(
	date: Date,
	interval: ChartInterval
): { start: Date; end: Date } {
	switch (interval) {
		case "day":
			return { start: startOfDay(date), end: endOfDay(date) };
		case "week":
			return {
				start: startOfWeek(date, { weekStartsOn: 1 }),
				end: endOfWeek(date, { weekStartsOn: 1 }),
			};
		case "month":
			return { start: startOfMonth(date), end: endOfMonth(date) };
		case "year":
			return { start: startOfYear(date), end: endOfYear(date) };
		case "all":
			return { start: new Date(0), end: new Date() };
	}
}
