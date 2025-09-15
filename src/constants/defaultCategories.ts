export const DEFAULT_CATEGORIES = {
	income: {
		wages: {
			name: "wages",
			icon: "money",
			colors: { foreground: "#28a745", background: "#f0fdf4" },
		},
		aid: {
			name: "aid",
			icon: "heartbeat",
			colors: { foreground: "#007bff", background: "#e6f0ff" },
		},
		investments: {
			name: "investments",
			icon: "percent",
			colors: { foreground: "#ffc107", background: "#fffbea" },
		},
		rental: {
			name: "rental",
			icon: "home",
			colors: { foreground: "#6c757d", background: "#f2f2f2" },
		},
		other: {
			name: "other",
			icon: "ellipsis-h",
			colors: { foreground: "#343a40", background: "#fafafa" },
		},
	},
	expense: {
		food: {
			name: "food",
			icon: "apple",
			colors: { foreground: "#dc3545", background: "#fff8f8" },
		},
		housing: {
			name: "housing",
			icon: "home",
			colors: { foreground: "#17a2b8", background: "#f0fcff" },
		},
		utilities: {
			name: "utilities",
			icon: "file-text-o",
			colors: { foreground: "#fd7e14", background: "#fff9f0" },
		},
		clothing: {
			name: "clothing",
			icon: "female",
			colors: { foreground: "#6f42c1", background: "#fcf4ff" },
		},
		transportation: {
			name: "transportation",
			icon: "train",
			colors: { foreground: "#007bff", background: "#f0f5ff" },
		},
		health: {
			name: "health",
			icon: "medkit",
			colors: { foreground: "#28a745", background: "#f0fff5" },
		},
		beauty: {
			name: "beauty",
			icon: "paint-brush",
			colors: { foreground: "#e83e8c", background: "#fff8fb" },
		},
		pet: {
			name: "pet",
			icon: "paw",
			colors: { foreground: "#fd7e14", background: "#fff9f0" },
		},
		entertainment: {
			name: "entertainment",
			icon: "film",
			colors: { foreground: "#ffc107", background: "#fffdf5" },
		},
		other: {
			name: "other",
			icon: "ellipsis-h",
			colors: { foreground: "#343a40", background: "#fafafa" },
		},
	},
} as const;

export type DefaultCategoryType = keyof typeof DEFAULT_CATEGORIES;
