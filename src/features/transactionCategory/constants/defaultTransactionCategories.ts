export const DEFAULT_TRANSACTION_CATEGORIES = [
	{
		type: "income",
		name: "wages",
		order: 1,
		icon: { name: "cash-outline", foregroundColor: "#28a745ff", backgroundColor: "#f0fdf4ff" },
	},
	{
		type: "income",
		name: "aid",
		order: 2,
		icon: { name: "gift-outline", foregroundColor: "#007bffff", backgroundColor: "#e6f0ffff" },
	},
	{
		type: "income",
		name: "investments",
		order: 3,
		icon: {
			name: "trending-up-outline",
			foregroundColor: "#ffc107ff",
			backgroundColor: "#fffbeaff",
		},
	},
	{
		type: "income",
		name: "rental",
		order: 4,
		icon: { name: "home-outline", foregroundColor: "#6c757dff", backgroundColor: "#f2f2f2ff" },
	},
	{
		type: "income",
		name: "other",
		order: 5,
		icon: {
			name: "ellipsis-horizontal-outline",
			foregroundColor: "#343a40ff",
			backgroundColor: "#fafafaff",
		},
	},
	{
		type: "expense",
		name: "essentials",
		order: 1,
		icon: {
			name: "bag-outline",
			foregroundColor: "#1D2A30ff",
			backgroundColor: "#E2EBEEff",
		},
	},
	{
		type: "expense",
		name: "restaurant",
		order: 2,
		icon: {
			name: "restaurant-outline",
			foregroundColor: "#dc3545ff",
			backgroundColor: "#fff8f8ff",
		},
	},
	{
		type: "expense",
		name: "housing",
		order: 3,
		icon: { name: "home-outline", foregroundColor: "#17a2b8ff", backgroundColor: "#f0fcffff" },
	},
	{
		type: "expense",
		name: "utilities",
		order: 4,
		icon: {
			name: "construct-outline",
			foregroundColor: "#fd7e14ff",
			backgroundColor: "#fff9f0ff",
		},
	},
	{
		type: "expense",
		name: "clothing",
		order: 5,
		icon: { name: "shirt-outline", foregroundColor: "#6f42c1ff", backgroundColor: "#fcf4ffff" },
	},
	{
		type: "expense",
		name: "transportation",
		order: 6,
		icon: { name: "train-outline", foregroundColor: "#007bffff", backgroundColor: "#f0f5ffff" },
	},
	{
		type: "expense",
		name: "health",
		order: 7,
		icon: { name: "medkit-outline", foregroundColor: "#28a745ff", backgroundColor: "#f0fff5ff" },
	},
	{
		type: "expense",
		name: "beauty",
		order: 8,
		icon: { name: "flower-outline", foregroundColor: "#e83e8cff", backgroundColor: "#fff8fbff" },
	},
	{
		type: "expense",
		name: "pet",
		order: 9,
		icon: { name: "paw-outline", foregroundColor: "#fd7e14ff", backgroundColor: "#fff9f0ff" },
	},
	{
		type: "expense",
		name: "entertainment",
		order: 10,
		icon: { name: "film-outline", foregroundColor: "#ffc107ff", backgroundColor: "#fffdf5ff" },
	},
	{
		type: "expense",
		name: "other",
		order: 11,
		icon: {
			name: "ellipsis-horizontal-outline",
			foregroundColor: "#343a40ff",
			backgroundColor: "#fafafaff",
		},
	},
] as const;

export type DefaultCategoryType = (typeof DEFAULT_TRANSACTION_CATEGORIES)[number]["name"];
