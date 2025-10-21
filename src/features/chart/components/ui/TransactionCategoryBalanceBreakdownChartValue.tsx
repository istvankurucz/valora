import AppError from "@/src/features/error/classes/AppError";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import sum from "@/src/utils/math/sum";
import { useMemo } from "react";
import { View } from "react-native";
import { useBalanceBreakdownChartData } from "../../contexts/BalanceBreakdownChartContext";
import { useChart } from "../../contexts/ChartContext";
import ChartValueBox from "./ChartValueBox";

const TransactionCategoryBalanceBreakdownChartValue = () => {
	//#region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { selectedIndex } = useChart();
	const { chartData } = useBalanceBreakdownChartData();
	//#endregion

	// #region Constants
	const amount = useMemo(() => {
		if (selectedIndex) {
			// Get data at the pressed index
			const selectedChartData = chartData[selectedIndex];

			// Check data
			if (!selectedChartData) throw new AppError({ message: "Invalid chart data index." });

			// Return income or expense value
			return transactionCategory?.type === "income"
				? selectedChartData.income.value
				: selectedChartData.expense.value;
		} else {
			// Sum all data values
			const totalAmount = sum(
				...chartData.map((data) =>
					transactionCategory?.type === "income" ? data.income.value : data.expense.value
				)
			);
			return totalAmount;
		}
	}, [transactionCategory, selectedIndex, chartData]);

	const label = useMemo(() => {
		if (selectedIndex) return chartData[selectedIndex]?.label ?? "";
		else return "Total";
	}, [selectedIndex, chartData]);
	//#endregion

	return (
		<View>
			<ChartValueBox
				type={transactionCategory?.type ?? "expense"}
				label={label}
				value={amount}
			/>
		</View>
	);
};

export default TransactionCategoryBalanceBreakdownChartValue;
