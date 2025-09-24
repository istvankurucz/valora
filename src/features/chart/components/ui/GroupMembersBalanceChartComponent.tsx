import ProgressBar from "@/src/components/ui/ProgressBar";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useChart } from "../../contexts/ChartContext";
import { useGroupMembersBalanceChartData } from "../../contexts/GroupMembersBalanceChartContext";

const GroupMembersBalanceChartComponent = () => {
	// #region Hooks
	const { setSelectedIndex } = useChart();
	const { data: formData, chartData } = useGroupMembersBalanceChartData();

	const barBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const incomeColor = useThemeColor({ variant: "success", shade: 400 });
	const expenseColor = useThemeColor({ variant: "danger", shade: 400 });
	//#endregion

	// #region Constants
	const maxValue = Math.max(
		...chartData.map((data) => [data.income.value, data.expense.value]).flat()
	);
	const incomeMaxValue = Math.max(...chartData.map((data) => data.income.value));
	const expenseMaxValue = Math.max(...chartData.map((data) => data.expense.value));
	//#endregion

	// #region Functions
	function handleBarPress(newIndex: number) {
		setSelectedIndex((index) => (index === newIndex ? null : newIndex));
	}
	//#endregion

	return (
		<ScrollView horizontal contentContainerStyle={styles.container}>
			{chartData.map((data, i) => (
				<View key={i} style={styles.dataContainer}>
					<View style={styles.barsContainer}>
						{formData.types.includes("income") && (
							<ProgressBar
								value={
									formData.relativeToMaximum
										? incomeMaxValue - data.income.value
										: data.income.value
								}
								maxValue={formData.relativeToMaximum ? incomeMaxValue : maxValue}
								vertical
								barColors={incomeColor}
								backgroundColor={barBackgroundColor}
								style={styles.bar}
								onPress={() => handleBarPress(i)}
							/>
						)}
						{formData.types.includes("expense") && (
							<ProgressBar
								value={
									formData.relativeToMaximum
										? expenseMaxValue - data.expense.value
										: data.expense.value
								}
								maxValue={formData.relativeToMaximum ? expenseMaxValue : maxValue}
								vertical
								barColors={expenseColor}
								backgroundColor={barBackgroundColor}
								style={styles.bar}
								onPress={() => handleBarPress(i)}
							/>
						)}
					</View>

					<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.label}>
						{data.name.substring(0, 10)}
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
		gap: 24,
		justifyContent: "center",
	},
	dataContainer: {
		alignItems: "center",
	},
	barsContainer: {
		flexDirection: "row",
		gap: 8,
	},
	bar: {
		height: 150,
	},
	label: {
		fontSize: FONT_SIZE[400],
	},
});

export default GroupMembersBalanceChartComponent;
