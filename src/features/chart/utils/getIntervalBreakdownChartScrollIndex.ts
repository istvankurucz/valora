import { getWeekOfMonth } from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function getIntervalBreakdownChartScrollIndex(interval: ChartInterval): number {
	// Get curent date
	const now = new Date();

	// Return scroll index based on interval
	switch (interval) {
		case "day":
			return 0;
		case "week":
			return (now.getDay() + 6) % 7;
		case "month":
			return getWeekOfMonth(now, { weekStartsOn: 1 }) - 1;
		case "year":
			return now.getMonth();
		case "all":
			return Infinity;
	}
}
