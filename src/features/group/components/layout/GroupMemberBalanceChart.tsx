import Section from "@/src/components/ui/Section/Section";
import BalanceChart from "@/src/features/chart/components/ui/BalanceChart";
import { BalanceChartProvider } from "@/src/features/chart/contexts/BalanceChartContext";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { View } from "react-native";
import { useGroupMember } from "../../contexts/GroupMemberContext";

const GroupMemberBalanceChart = () => {
	//#region Hooks
	const { member } = useGroupMember();
	// #endregion

	return (
		<View>
			<Section.Title>Balance of {member?.name}</Section.Title>

			<ChartProvider transactions={member?.transactions ?? []}>
				<ChartNavigationProvider>
					<BalanceChartProvider>
						<BalanceChart />
					</BalanceChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default GroupMemberBalanceChart;
