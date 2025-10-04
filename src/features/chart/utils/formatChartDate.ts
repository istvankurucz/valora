import {
	endOfWeek,
	format,
	isSameWeek,
	isToday,
	isYesterday,
	startOfWeek,
	subWeeks,
} from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function formatChartDate(date: Date, interval: ChartInterval): string {
	switch (interval) {
		case "day":
			if (isToday(date)) return "Today";
			if (isYesterday(date)) return "Yesterday";

			return format(date, "yyyy.MM.dd");
		case "week":
			if (isSameWeek(date, new Date(), { weekStartsOn: 1 })) return "This week";
			if (isSameWeek(date, subWeeks(new Date(), 1), { weekStartsOn: 1 })) return "Last week";

			const start = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy.MM.dd");
			const end = format(endOfWeek(date, { weekStartsOn: 1 }), "yyyy.MM.dd");
			return `${start}-${end}`;
		case "month":
			return format(date, "MMMM yyyy");
		case "year":
			return format(date, "yyyy");
		case "all":
			return "All time";
		default:
			return format(date, "yyyy.MM.dd");
	}
}
