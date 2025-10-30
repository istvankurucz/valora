import { format } from "date-fns";
import { ChartInterval } from "../constants/chartIntervalOptions";

export default function formatBalanceBreakdownChartLabel(
	date: Date,
	interval: ChartInterval
): string {
	switch (interval) {
		case "day":
			return format(date, "EEEE");
		case "week":
			return format(date, "EEEE");
		case "month":
			const weekOfMonth = Math.ceil(date.getDate() / 7);
			return `${weekOfMonth}. week`;
		case "year":
			return format(date, "MMMM");
		case "all":
			return format(date, "yyyy");
	}
}
