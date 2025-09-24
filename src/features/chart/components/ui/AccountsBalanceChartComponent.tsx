import ProgressBar from "@/src/components/ui/ProgressBar";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAccountsBalanceChartData } from "../../contexts/AccountsBalanceChartContext";
import { useChart } from "../../contexts/ChartContext";

const AccountsBalanceChartComponent = () => {
	// #region Hooks
	const { setSelectedIndex } = useChart();
	const { data: formData, chartData } = useAccountsBalanceChartData();

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
					<View style={styles.barsContainer}>
						{formData.types.includes("income") && (
							<ProgressBar
								value={data.income.value}
								maxValue={maxValue}
								vertical
								barColors={incomeColor}
								backgroundColor={barBackgroundColor}
								style={styles.bar}
								onPress={() => handleBarPress(i)}
							/>
						)}
						{formData.types.includes("expense") && (
							<ProgressBar
								value={data.expense.value}
								maxValue={maxValue}
								vertical
								barColors={expenseColor}
								backgroundColor={barBackgroundColor}
								style={styles.bar}
								onPress={() => handleBarPress(i)}
							/>
						)}
					</View>

					<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.label}>
						{data.label.substring(0, 3)}
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

export default AccountsBalanceChartComponent;
