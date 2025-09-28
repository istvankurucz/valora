import { CurrencyCode } from "@/src/constants/currencies";
import formatAmount from "../format/formatAmount";

export default function getCurrencySymbol(currency: CurrencyCode): {
	symbol: string;
	position: "before" | "after";
} {
	// Get formatted value
	const formattedValue = formatAmount(0, currency);

	// Extract symbol by removing digits, commas, periods, and spaces
	const symbol = formattedValue.replace(/[\d.,\s]/g, "");

	// Determine position
	const position = formattedValue.startsWith(symbol) ? "before" : "after";

	// Retrun symbol and position
	return { symbol, position };
}
