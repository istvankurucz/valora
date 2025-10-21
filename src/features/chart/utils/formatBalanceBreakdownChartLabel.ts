import { format } from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function formatBalanceBreakdownChartLabel(
	date: Date,
	interval: ChartInterval
): string {
	switch (interval) {
		case "day":
			return format(date, "EEE");
		case "week":
			return format(date, "EEE");
		case "month":
			const weekOfMonth = Math.ceil(date.getDate() / 7);
			return `Week ${weekOfMonth}`;
		case "year":
			return format(date, "LLL");
		case "all":
			return format(date, "yyyy");
	}
}
