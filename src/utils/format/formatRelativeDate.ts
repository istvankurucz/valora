import { differenceInDays, format, isToday, isYesterday } from "date-fns";

export default function formatRelativeDate(date: Date): string {
	// Today
	if (isToday(date)) return `Today, ${format(date, "HH:mm")}`;

	// Yesterday
	if (isYesterday(date)) return `Yesterday, ${format(date, "HH:mm")}`;

	// Within 1 week
	const daysAgo = differenceInDays(new Date(), date);
	if (daysAgo < 7) return `${format(date, "EEEE")}, ${format(date, "HH:mm")}`;

	// Fallback
	return `${format(date, "yyyy.MM.dd")}, ${format(date, "HH:mm")}`;
}
