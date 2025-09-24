import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useAccountsBalanceChartData } from "../../contexts/AccountsBalanceChartContext";
import { useChart } from "../../contexts/ChartContext";
import getAccountsBalanceChartValue from "../../utils/getAccountsBalanceChartValue";
import ChartValueBox from "./ChartValueBox";

type Props = ViewProps;

const AccountsBalanceChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { selectedIndex } = useChart();
	const { data, chartData } = useAccountsBalanceChartData();
	//#endregion

	//#region Constants
	const valueData = useMemo(
		() => getAccountsBalanceChartValue(chartData, { selectedIndex }),
		[chartData, selectedIndex]
	);
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			<ThemedText fontFamily="Poppins_500Medium" style={styles.account}>
				{"label" in valueData ? valueData.label : "All accounts"}
			</ThemedText>
			<View style={styles.boxContainer}>
				{data.types.includes("income") && (
					<ChartValueBox type="income" label="Income" value={valueData.income.value} />
				)}
				{data.types.includes("expense") && (
					<ChartValueBox type="expense" label="Expense" value={valueData.expense.value} />
				)}
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	account: {
		textTransform: "capitalize",
	},
	value: {
		fontSize: FONT_SIZE[700],
	},
	boxContainer: {
		flexDirection: "row",
		gap: 16,
	},
});

export default AccountsBalanceChartValue;
