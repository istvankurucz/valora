import Section from "@/src/components/ui/Section/Section";
import { StyleSheet } from "react-native";
import ChartDate from "./ChartDate";
import ChartInterval from "./ChartInterval";
import GroupMembersBalanceChartComponent from "./GroupMembersBalanceChartComponent";
import GroupMembersBalanceChartValue from "./GroupMembersBalanceChartValue";

const GroupMembersBalanceChart = () => {
	return (
		<Section shade={100} style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<GroupMembersBalanceChartValue />
			<GroupMembersBalanceChartComponent />
		</Section>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
});

export default GroupMembersBalanceChart;
