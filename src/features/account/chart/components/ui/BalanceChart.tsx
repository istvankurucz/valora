import Section from "@/src/components/ui/Section/Section";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import BalanceChartComponent from "./BalanceChartComponent";
import BalanceChartValue from "./BalanceChartValue";
import ChartDate from "./ChartDate";
import ChartInterval from "./ChartInterval";

const BalanceChart = () => {
	return (
		<Section shade={100} style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<BalanceChartValue />
			<BalanceChartComponent />
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

export default BalanceChart;
