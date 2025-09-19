export const DEFAULT_TRANSACTION_CATEGORIES = [
	{
		type: "income",
		name: "wages",
		icon: { name: "cash-outline", foregroundColor: "#28a745ff", backgroundColor: "#f0fdf4ff" },
	},
	{
		type: "income",
		name: "aid",
		icon: { name: "gift-outline", foregroundColor: "#007bffff", backgroundColor: "#e6f0ffff" },
	},
	{
		type: "income",
		name: "investments",
		icon: {
			name: "trending-up-outline",
			foregroundColor: "#ffc107ff",
			backgroundColor: "#fffbeaff",
		},
	},
	{
		type: "income",
		name: "rental",
		icon: { name: "home-outline", foregroundColor: "#6c757dff", backgroundColor: "#f2f2f2ff" },
	},
	{
		type: "income",
		name: "other",
		icon: {
			name: "ellipsis-horizontal-outline",
			foregroundColor: "#343a40ff",
			backgroundColor: "#fafafaff",
		},
	},
	{
		type: "expense",
		name: "food",
		icon: {
			name: "fast-food-outline",
			foregroundColor: "#dc3545ff",
			backgroundColor: "#fff8f8ff",
		},
	},
	{
		type: "expense",
		name: "housing",
		icon: { name: "home-outline", foregroundColor: "#17a2b8ff", backgroundColor: "#f0fcffff" },
	},
	{
		type: "expense",
		name: "utilities",
		icon: {
			name: "construct-outline",
			foregroundColor: "#fd7e14ff",
			backgroundColor: "#fff9f0ff",
		},
	},
	{
		type: "expense",
		name: "clothing",
		icon: { name: "shirt-outline", foregroundColor: "#6f42c1ff", backgroundColor: "#fcf4ffff" },
	},
	{
		type: "expense",
		name: "transportation",
		icon: { name: "train-outline", foregroundColor: "#007bffff", backgroundColor: "#f0f5ffff" },
	},
	{
		type: "expense",
		name: "health",
		icon: { name: "medkit-outline", foregroundColor: "#28a745ff", backgroundColor: "#f0fff5ff" },
	},
	{
		type: "expense",
		name: "beauty",
		icon: { name: "flower-outline", foregroundColor: "#e83e8cff", backgroundColor: "#fff8fbff" },
	},
	{
		type: "expense",
		name: "pet",
		icon: { name: "paw-outline", foregroundColor: "#fd7e14ff", backgroundColor: "#fff9f0ff" },
	},
	{
		type: "expense",
		name: "entertainment",
		icon: { name: "film-outline", foregroundColor: "#ffc107ff", backgroundColor: "#fffdf5ff" },
	},
	{
		type: "expense",
		name: "other",
		icon: {
			name: "ellipsis-horizontal-outline",
			foregroundColor: "#343a40ff",
			backgroundColor: "#fafafaff",
		},
	},
] as const;

export type DefaultCategoryType = keyof typeof DEFAULT_TRANSACTION_CATEGORIES;
