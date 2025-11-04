export const TRANSACTION_CATEGORIES_SORTING_OPTIONS = [
	{ icon: "cash-outline", text: "Value", value: "value" },
	{ icon: "reorder-three-outline", text: "Order", value: "order" },
] as const;
export type TransactionCategoriesSorting =
	(typeof TRANSACTION_CATEGORIES_SORTING_OPTIONS)[number]["value"];
