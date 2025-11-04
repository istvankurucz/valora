import ProgressBar from "@/src/components/ui/ProgressBar";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useBarChart } from "../../contexts/BarChartContext";
import { BarData } from "../../types/chartTypes";
import formatChartLabel from "../../utils/formatChartLabel";
import getMaxChartValue from "../../utils/getMaxChartValue";

const BarChart = () => {
	// #region Hooks
	const { chartData, setSelectedIndex, barsContainerRef } = useBarChart();

	const defaultBarColor = useThemeColor({ variant: "neutral", shade: 800 });
	const incomeBarColor = useThemeColor({ variant: "success", shade: 400 });
	const expenseBarColor = useThemeColor({ variant: "danger", shade: 400 });
	const defaultBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	//#endregion

	// #region Constants
	const maxValue = getMaxChartValue(chartData);
	//#endregion

	// #region Functions
	function getBarColor(bar: BarData): string {
		if (bar.barColor) return bar.barColor;
		if (bar.type === "income") return incomeBarColor;
		if (bar.type === "expense") return expenseBarColor;
		return defaultBarColor;
	}

	function handleBarPress(newIndex: number) {
		setSelectedIndex((index) => (index === newIndex ? null : newIndex));
	}

	//#endregion

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
			ref={barsContainerRef}
		>
			{chartData.groups.map((group, i) => (
				<View key={i} style={styles.group}>
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.bars}
						onPress={() => handleBarPress(i)}
					>
						{group.bars.map((bar, j) => (
							<ProgressBar
								key={j}
								value={bar.value}
								maxValue={maxValue}
								vertical
								barColors={getBarColor(bar)}
								backgroundColor={bar.backgroundColor ?? defaultBackgroundColor}
								style={[styles.bar, bar.width ? { width: bar.width } : undefined]}
								disabled
							/>
						))}
					</TouchableOpacity>

					{group.label && (
						<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.label}>
							{formatChartLabel(group.label)}
						</ThemedText>
					)}
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
	group: {
		alignItems: "center",
	},
	bars: {
		flexDirection: "row",
		gap: 8,
	},
	bar: {
		width: 24,
		height: 150,
	},
	label: {
		fontSize: FONT_SIZE[400],
	},
});

export default BarChart;
