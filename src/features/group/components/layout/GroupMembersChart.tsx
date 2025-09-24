import GroupMembersBalanceChart from "@/src/features/chart/components/ui/GroupMembersBalanceChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { GroupMembersBalanceChartProvider } from "@/src/features/chart/contexts/GroupMembersBalanceChartContext";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";
import GroupMembersBalanceChartHeader from "./GroupMembersBalanceChartHeader";

const GroupMembersChart = () => {
	// #region Hooks
	const { group } = useGroup();
	//#endregion

	return (
		<View>
			<ChartProvider transactions={group?.transactions ?? []}>
				<ChartNavigationProvider>
					<GroupMembersBalanceChartProvider>
						<GroupMembersBalanceChartHeader />
						<GroupMembersBalanceChart />
					</GroupMembersBalanceChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default GroupMembersChart;
