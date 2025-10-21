import Section from "@/src/components/ui/Section/Section";
import TransactionCategoryBalanceBreakdownChart from "@/src/features/chart/components/ui/TransactionCategoryBalanceBreakdownChart";
import { BalanceBreakdownChartProvider } from "@/src/features/chart/contexts/BalanceBreakdownChartContext";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { View } from "react-native";
import { useTransactionCategory } from "../../contexts/TransactionCategoryContext";

const TransactionCategoryChart = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	return (
		<View>
			<Section.Title>Chart</Section.Title>

			<ChartProvider transactions={transactionCategory?.transactions ?? []}>
				<ChartNavigationProvider>
					<BalanceBreakdownChartProvider>
						<TransactionCategoryBalanceBreakdownChart />
					</BalanceBreakdownChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default TransactionCategoryChart;
