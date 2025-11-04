import Section from "@/src/components/ui/Section/Section";
import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getIntervalBreakdownChartData from "@/src/features/chart/utils/getIntervalBreakdownChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useGroupMember } from "../../contexts/GroupMemberContext";

const GroupMemberBalanceChart = () => {
	//#region Hooks
	const { member } = useGroupMember();
	// #endregion

	// #region Constants
	const transactions = member?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getIntervalBreakdownChartData(transactions, { ...params, firstTransactionDate });
	}
	//#endregion

	return (
		<View>
			<Section.Title>Balance of {member?.name}</Section.Title>

			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultLabel="Total balance"
				autoScroll
			/>
		</View>
	);
};

export default GroupMemberBalanceChart;
