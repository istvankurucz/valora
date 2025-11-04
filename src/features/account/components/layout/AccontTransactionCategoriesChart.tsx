import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getTransactionCategoriesChartData from "@/src/features/chart/utils/getTransactionCategoriesChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useTransactionCategoriesChart } from "../../../chart/contexts/TransactionCategoriesChartContext";
import TransactionCategoriesChartHeader from "../../../transactionCategory/components/layout/TransactionCategoriesChartHeader";
import { useAccount } from "../../contexts/AccountContext";

const AccontTransactionCategoriesChart = () => {
	//#region Hooks
	const { account } = useAccount();
	const { data, transactionCategories } = useTransactionCategoriesChart();
	// #endregion

	// #region Constants
	const transactions = account?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getTransactionCategoriesChartData(transactions, {
			...params,
			transactionTypes: data.types,
			sorting: data.sorting,
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

export default AccontTransactionCategoriesChart;
