import TransactionCategoriesChartHeader from "@/src/features/chart/components/layout/TransactionCategoriesChartHeader";
import TransactionCategoriesChart from "@/src/features/chart/components/ui/TransactionCategoriesChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { View } from "react-native";
import { useAdminTransactions } from "../../contexts/AdminTransactionsContext";

const AdminTransactionCategoriesChart = () => {
	//#region Hooks
	const { transactions } = useAdminTransactions();
	// #endregion

	return (
		<View>
			<ChartProvider transactions={transactions}>
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

export default AdminTransactionCategoriesChart;
