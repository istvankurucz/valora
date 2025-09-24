import TransactionCategoriesChartHeader from "@/src/features/chart/components/layout/TransactionCategoriesChartHeader";
import TransactionCategoriesChart from "@/src/features/chart/components/ui/TransactionCategoriesChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { useMemo } from "react";
import { View } from "react-native";
import { useTransactionCategories } from "../../contexts/TransactionCategoriesContext";

const TransactionCategoriesTransactionCategoriesChart = () => {
	//#region Hooks
	const { transactionCategories } = useTransactionCategories();
	// #endregion

	// #region Constants
	const transactions = useMemo(
		() => transactionCategories?.flatMap((category) => category.transactions) ?? [],
		[transactionCategories]
	);
	//#endregion

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

export default TransactionCategoriesTransactionCategoriesChart;
