export const TRANSACTION_SORT_OPTIONS = [
	{
		property: "timestamp",
		asc: false,
		icon: "calendar-outline",
		text: "Date desc",
	},
	{
		property: "timestamp",
		asc: true,
		icon: "calendar-outline",
		text: "Date asc",
	},
	{
		property: "amount",
		asc: false,
		icon: "cash-outline",
		text: "Amount desc",
	},
	{
		property: "amount",
		asc: true,
		icon: "cash-outline",
		text: "Amount asc",
	},
] as const;
export type TransactionSortOption = (typeof TRANSACTION_SORT_OPTIONS)[number];
