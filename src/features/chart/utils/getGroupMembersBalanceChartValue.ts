import AppError from "../../error/classes/AppError";
import { BalanceChartData, GroupMembersBalanceChartData } from "../types/chartTypes";

export default function getGroupMembersBalanceChartValue(
	chartData: GroupMembersBalanceChartData[],
	params: { selectedIndex: number | null; relativeToMaximum: boolean }
): GroupMembersBalanceChartData | BalanceChartData {
	// Get params
	const { selectedIndex, relativeToMaximum } = params;

	// There is a selected index
	if (selectedIndex != null) {
		// Get selected chart data
		const selectedChartData = chartData[selectedIndex];

		// Check selected chart data
		if (!selectedChartData) {
			throw new AppError({ message: "Invalid selected group members balance chart data." });
		}

		// Return selected chart data
		if (relativeToMaximum) {
			// Get maximum income and expense values
			const maxIncome = Math.max(...chartData.map((data) => data.income.value));
			const maxExpense = Math.max(...chartData.map((data) => data.expense.value));

			// Return with modified values
			return {
				...selectedChartData,
				income: { value: maxIncome - selectedChartData.income.value },
				expense: { value: maxExpense - selectedChartData.expense.value },
			};
		} else return selectedChartData;
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
