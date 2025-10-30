import { BarChartData } from "../types/chartTypes";

export default function getMaxChartValue(chartData: BarChartData): number {
	// Get values
	const values = chartData.groups.map((group) => group.bars.map((bar) => bar.value)).flat();

	// Return max value
	return Math.max(...values);
}
