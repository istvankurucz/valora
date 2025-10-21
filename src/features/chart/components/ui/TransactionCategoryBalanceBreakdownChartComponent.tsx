import ProgressBar from "@/src/components/ui/ProgressBar";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import useThemeColor from "@/src/hooks/useThemeColor";
import { ScrollView, StyleSheet, View } from "react-native";
import { useBalanceBreakdownChartData } from "../../contexts/BalanceBreakdownChartContext";
import { useChart } from "../../contexts/ChartContext";
import formatChartLabel from "../../utils/formatChartLabel";

const TransactionCategoryBalanceBreakdownChartComponent = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { setSelectedIndex } = useChart();
	const { chartData } = useBalanceBreakdownChartData();

	const barBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const incomeColor = useThemeColor({ variant: "success", shade: 400 });
	const expenseColor = useThemeColor({ variant: "danger", shade: 400 });
	//#endregion

	// #region Constants
	const maxValue = Math.max(
		...chartData.map((data) => [data.income.value, data.expense.value]).flat()
	);
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
					<ProgressBar
						value={
							transactionCategory?.type === "income" ? data.income.value : data.expense.value
						}
						maxValue={maxValue}
						vertical
						barColors={transactionCategory?.type === "income" ? incomeColor : expenseColor}
						backgroundColor={barBackgroundColor}
						style={styles.bar}
						onPress={() => handleBarPress(i)}
					/>

					<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.label}>
						{formatChartLabel(data.label, { length: 8 })}
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
	bar: {
		height: 150,
	},
	label: {
		fontSize: FONT_SIZE[400],
	},
});

export default TransactionCategoryBalanceBreakdownChartComponent;
