import Section from "@/src/components/ui/Section/Section";
import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getIntervalBreakdownChartData from "@/src/features/chart/utils/getIntervalBreakdownChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useAccount } from "../../contexts/AccountContext";

const AccountBalanceChart = () => {
	//#region Hooks
	const { account } = useAccount();
	// #endregion

	// #region Constants
	const transactions = account?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getIntervalBreakdownChartData(transactions, { ...params, firstTransactionDate });
	}
	//#endregion

	return (
		<View>
			<Section.Title>Account balance</Section.Title>

			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultLabel="Total balance"
			/>
		</View>
	);
};

export default AccountBalanceChart;
