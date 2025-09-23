import ProgressBar from "@/src/components/ui/ProgressBar";
import useThemeColor from "@/src/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import { useBalanceChartData } from "../../contexts/BalanceChartContext";

const BalanceChartComponent = () => {
	// #region Hooks
	const { chartData } = useBalanceChartData();

	const barBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const incomeColor = useThemeColor({ variant: "success", shade: 400 });
	const expenseColor = useThemeColor({ variant: "danger", shade: 400 });
	//#endregion

	// #region Constants
	const maxValue = Math.max(chartData.income.value, chartData.expense.value) * 1.1;
	//#endregion

	return (
		<View style={styles.contaiener}>
			<ProgressBar
				value={chartData.income.value}
				maxValue={maxValue}
				activeOpacity={1}
				barColors={incomeColor}
				backgroundColor={barBackgroundColor}
				style={styles.bar}
			/>
			<ProgressBar
				value={chartData.expense.value}
				maxValue={maxValue}
				activeOpacity={1}
				barColors={expenseColor}
				backgroundColor={barBackgroundColor}
				style={styles.bar}
			/>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	contaiener: {
		gap: 12,
	},
	bar: {
		height: 32,
	},
});

export default BalanceChartComponent;
