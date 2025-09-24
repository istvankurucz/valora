import TransactionCategoriesChartHeader from "@/src/features/chart/components/layout/TransactionCategoriesChartHeader";
import TransactionCategoriesChart from "@/src/features/chart/components/ui/TransactionCategoriesChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { View } from "react-native";
import { useGroupMember } from "../../contexts/GroupMemberContext";

const GroupMemberTransactionCategoriesChart = () => {
	//#region Hooks
	const { member } = useGroupMember();
	// #endregion

	return (
		<View>
			<ChartProvider transactions={member?.transactions ?? []}>
				<ChartNavigationProvider>
					<TransactionCategoriesChartProvider>
						<TransactionCategoriesChartHeader />
						<TransactionCategoriesChart />
					</TransactionCategoriesChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default GroupMemberTransactionCategoriesChart;
