import Section from "@/src/components/ui/Section/Section";
import BalanceChart from "@/src/features/chart/components/ui/BalanceChart";
import { BalanceChartProvider } from "@/src/features/chart/contexts/BalanceChartContext";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { View } from "react-native";
import { useAdminTransactions } from "../../contexts/AdminTransactionsContext";

const AdminBalanceChart = () => {
	//#region Hooks
	const { transactions } = useAdminTransactions();
	// #endregion

	return (
		<View>
			<Section.Title>Your balance</Section.Title>

			<ChartProvider transactions={transactions}>
				<ChartNavigationProvider>
					<BalanceChartProvider>
						<BalanceChart />
					</BalanceChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default AdminBalanceChart;
