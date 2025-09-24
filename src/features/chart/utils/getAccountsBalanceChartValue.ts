import AppError from "../../error/classes/AppError";
import { AccountBalanceChartData, BalanceChartData } from "../types/chartTypes";

export default function getAccountsBalanceChartValue(
	chartData: AccountBalanceChartData[],
	params: { selectedIndex: number | null }
): AccountBalanceChartData | BalanceChartData {
	// Get params
	const { selectedIndex } = params;

	// There is a selected index
	if (selectedIndex != null) {
		// Get selected chart data
		const selectedChartData = chartData[selectedIndex];

		// Check selected chart data
		if (!selectedChartData) {
			throw new AppError({ message: "Invalid selected transaction chart data." });
		}

		// Return selected chart data
		return selectedChartData;
	} else {
		// Sum chart data values
		const incomeSum = chartData.reduce((total, data) => total + data.income.value, 0);
		const expenseSum = chartData.reduce((total, data) => total + data.expense.value, 0);

		return {
			income: { value: incomeSum },
			expense: { value: expenseSum },
		};
	}
}
