import { View } from "react-native";
import TransactionCategoriesChartHeader from "../../chart/components/layout/TransactionCategoriesChartHeader";
import TransactionCategoriesChart from "../../chart/components/ui/TransactionCategoriesChart";
import { ChartProvider } from "../../chart/contexts/ChartContext";
import { ChartNavigationProvider } from "../../chart/contexts/ChartNavigationContext";
import { TransactionCategoriesChartProvider } from "../../chart/contexts/TransactionCategoriesChartContext";
import { useAccount } from "../../contexts/AccountContext";

const AccontTransactionCategoriesChart = () => {
	//#region Hooks
	const { account } = useAccount();
	// #endregion

	return (
		<View>
			<ChartProvider transactions={account?.transactions ?? []}>
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

export default AccontTransactionCategoriesChart;
