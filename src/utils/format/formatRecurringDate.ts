import { differenceInCalendarDays, isToday, isTomorrow, isYesterday } from "date-fns";

export default function formatRecurringDate(date: Date): string {
	// Diff is within 1 day
	if (isToday(date)) return "Today";
	if (isTomorrow(date)) return "Tomorrow";
	if (isYesterday(date)) return "Yesterday";

	// Diff is more than 1 day
	const diff = differenceInCalendarDays(date, new Date());
	if (diff < 0) return `${Math.abs(diff)} days ago`;
	else return `In ${diff} days`;
}
