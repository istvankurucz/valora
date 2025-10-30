import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { useTransactionCategoriesChart } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getTransactionCategoriesChartData from "@/src/features/chart/utils/getTransactionCategoriesChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import TransactionCategoriesChartHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoriesChartHeader";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";

const GroupTransactionCategoriesChart = () => {
	//#region Hooks
	const { group } = useGroup();
	const { data, transactionCategories } = useTransactionCategoriesChart();
	// #endregion

	// #region Constants
	const transactions = group?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getTransactionCategoriesChartData(transactions, {
			...params,
			transactionTypes: data.types,
			categories: transactionCategories,
		});
	}
	//#endregion

	return (
		<View>
			<TransactionCategoriesChartHeader />
			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultLabel="All categories"
				useTypeAsLabel
			/>
		</View>
	);
};

export default GroupTransactionCategoriesChart;
