import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { useGroupMembersBalanceChart } from "@/src/features/chart/contexts/GroupMembersBalanceChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getGroupMembersBalanceChartData from "@/src/features/chart/utils/getGroupMembersBalanceChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";
import GroupMembersBalanceChartHeader from "./GroupMembersBalanceChartHeader";

const GroupMembersChart = () => {
	// #region Hooks
	const { group } = useGroup();
	const { data } = useGroupMembersBalanceChart();
	//#endregion

	// #region Constants
	const members = group?.users ?? [];
	const transactions = group?.transactions ?? [];
	const firstTransactionDate = getFirstTransactionDate(transactions);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getGroupMembersBalanceChartData(transactions, {
			...params,
			members,
			types: data.types,
			relativeToMaximum: data.relativeToMaximum,
		});
	}
	//#endregion

	return (
		<View>
			<GroupMembersBalanceChartHeader />
			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultInterval="all"
				defaultLabel="All members"
				useTypeAsLabel
			/>
		</View>
	);
};

export default GroupMembersChart;
