import AppError from "@/src/features/error/classes/AppError";
import { BalanceChartData, TransactionCategoriesChartData } from "../types/chartTypes";

export default function getTransactionCategoriesChartValue(
	chartData: TransactionCategoriesChartData[],
	params: { selectedIndex: number | null }
): TransactionCategoriesChartData | BalanceChartData {
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
		// Filter chart data by type
		const incomeData = chartData.filter((data) => data.type === "income");
		const expenseData = chartData.filter((data) => data.type === "expense");

		// Sum chart data values
		const incomeSum = incomeData.reduce((total, data) => total + data.value, 0);
		const expenseSum = expenseData.reduce((total, data) => total + data.value, 0);

		return {
			income: { value: incomeSum },
			expense: { value: expenseSum },
		};
	}
}
