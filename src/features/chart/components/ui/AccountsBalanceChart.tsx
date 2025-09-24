import Section from "@/src/components/ui/Section/Section";
import { StyleSheet } from "react-native";
import AccountsBalanceChartComponent from "./AccountsBalanceChartComponent";
import AccountsBalanceChartValue from "./AccountsBalanceChartValue";
import ChartDate from "./ChartDate";
import ChartInterval from "./ChartInterval";

const AccountsBalanceChart = () => {
	return (
		<Section shade={100} style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<AccountsBalanceChartValue />
			<AccountsBalanceChartComponent />
		</Section>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
});

export default AccountsBalanceChart;
