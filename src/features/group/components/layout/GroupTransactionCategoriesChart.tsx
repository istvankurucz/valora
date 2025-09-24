import TransactionCategoriesChartHeader from "@/src/features/chart/components/layout/TransactionCategoriesChartHeader";
import TransactionCategoriesChart from "@/src/features/chart/components/ui/TransactionCategoriesChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";

const GroupTransactionCategoriesChart = () => {
	//#region Hooks
	const { group } = useGroup();
	// #endregion

	return (
		<View>
			<ChartProvider transactions={group?.transactions ?? []}>
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

export default GroupTransactionCategoriesChart;
