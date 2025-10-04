import capitalizeString from "@/src/utils/string/capitalizeString";

export default function formatChartLabel(label: string, options = { length: 4 }): string {
	// Get options
	const { length } = options;

	// Get label string
	const labelString = label.length > length ? `${label.substring(0, length - 1)}.` : label;

	// Return capitalized label string
	return capitalizeString(labelString);
}
