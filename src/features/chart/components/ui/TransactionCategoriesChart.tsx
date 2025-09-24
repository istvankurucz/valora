import Section from "@/src/components/ui/Section/Section";
import { StyleSheet } from "react-native";
import ChartDate from "./ChartDate";
import ChartInterval from "./ChartInterval";
import TransactionCategoriesChartComponent from "./TransactionCategoriesChartComponent";
import TransactionCategoriesChartValue from "./TransactionCategoriesChartValue";

const TransactionCategoriesChart = () => {
	return (
		<Section style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<TransactionCategoriesChartValue />
			<TransactionCategoriesChartComponent />
		</Section>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
});

export default TransactionCategoriesChart;
