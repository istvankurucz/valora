import Section from "@/src/components/ui/Section/Section";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import BarChart from "../ui/BarChart";
import ChartDate from "../ui/ChartDate";
import ChartInterval from "../ui/ChartInterval";
import ChartValues from "../ui/ChartValues";

const Chart = () => {
	return (
		<Section shade={100} style={styles.container}>
			<ChartInterval />
			<ChartDate />
			<ChartValues />
			<BarChart />
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

export default Chart;
