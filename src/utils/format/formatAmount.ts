import { CurrencyCode } from "@/src/constants/currencies";

export default function formatAmount(amount: number, currency: CurrencyCode): string {
	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency,
		currencyDisplay: "narrowSymbol",
		useGrouping: true,
		maximumFractionDigits: currency === "HUF" ? 0 : undefined,
	});

	return formatter.format(amount);
}
