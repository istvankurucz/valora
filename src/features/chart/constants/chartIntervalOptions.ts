export const CHART_INTERVAL_OPTIONS = ["day", "week", "month", "year", "all"] as const;
export type ChartInterval = (typeof CHART_INTERVAL_OPTIONS)[number];
