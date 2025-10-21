import Section from "@/src/components/ui/Section/Section";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import ChartDate from "./ChartDate";
import ChartInterval from "./ChartInterval";
import TransactionCategoryBalanceBreakdownChartComponent from "./TransactionCategoryBalanceBreakdownChartComponent";
import TransactionCategoryBalanceBreakdownChartValue from "./TransactionCategoryBalanceBreakdownChartValue";

const TransactionCategoryBalanceBreakdownChart = () => {
	return (
		<Section shade={100} style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<TransactionCategoryBalanceBreakdownChartValue />
			<TransactionCategoryBalanceBreakdownChartComponent />
		</Section>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 16,
		borderRadius: BORDER_RADIUS[500],
	},
});

export default TransactionCategoryBalanceBreakdownChart;
