import Section from "@/src/components/ui/Section/Section";
import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getTransactionCategoryChartData from "@/src/features/chart/utils/getTransactionCategoryChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useTransactionCategory } from "../../contexts/TransactionCategoryContext";

const TransactionCategoryChart = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	// #region Constants
	const transactions = transactionCategory?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	const categoryType = transactionCategory?.type ?? "expense";
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getTransactionCategoryChartData(transactions, {
			...params,
			firstTransactionDate,
			categoryType,
		});
	}
	//#endregion

	return (
		<View>
			<Section.Title>Chart</Section.Title>

			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultLabel={`Total ${categoryType}`}
			/>
		</View>
	);
};

export default TransactionCategoryChart;
