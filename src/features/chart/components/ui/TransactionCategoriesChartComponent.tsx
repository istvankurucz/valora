import ProgressBar from "@/src/components/ui/ProgressBar";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useChart } from "../../contexts/ChartContext";
import { useTransactionCategoriesChart } from "../../contexts/TransactionCategoriesChartContext";
import formatChartLabel from "../../utils/formatChartLabel";

const TransactionCategoriesChartComponent = () => {
	// #region Hooks
	const { setSelectedIndex } = useChart();
	const { chartData } = useTransactionCategoriesChart();

	const barBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const incomeColor = useThemeColor({ variant: "success", shade: 400 });
	const expenseColor = useThemeColor({ variant: "danger", shade: 400 });
	//#endregion

	// #region Constants
	const maxValue = Math.max(...chartData.map((data) => data.value));
	//#endregion

	// #region Functions
	function handleBarPress(newIndex: number) {
		setSelectedIndex((index) => (index === newIndex ? null : newIndex));
	}
	//#endregion

	return (
		<ScrollView horizontal contentContainerStyle={styles.container}>
			{chartData.map((data, i) => (
				<View key={i} style={styles.item}>
					<ProgressBar
						value={data.value}
						maxValue={maxValue}
						vertical
						barColors={data.type === "income" ? incomeColor : expenseColor}
						backgroundColor={barBackgroundColor}
						style={styles.bar}
						onPress={() => handleBarPress(i)}
					/>
					<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.label}>
						{formatChartLabel(data.label)}
					</ThemedText>
				</View>
			))}
		</ScrollView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		minWidth: "100%",
		gap: 12,
		justifyContent: "center",
	},
	item: {
		width: 32,
		alignItems: "center",
	},
	bar: {
		height: 150,
	},
	label: {
		fontSize: FONT_SIZE[400],
	},
});

export default TransactionCategoriesChartComponent;
