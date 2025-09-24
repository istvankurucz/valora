import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useChart } from "../../contexts/ChartContext";
import { useTransactionCategoriesChart } from "../../contexts/TransactionCategoriesChartContext";
import getTransactionCategoriesChartValue from "../../utils/getTransactionCategoriesChartValue";
import ChartValueBox from "./ChartValueBox";

type Props = ViewProps;

const TransactionCategoriesChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { selectedIndex } = useChart();
	const { chartData } = useTransactionCategoriesChart();
	const { formatAmount } = useFormatAmount();
	//#endregion

	// #region Constants
	const valueData = useMemo(
		() => getTransactionCategoriesChartValue(chartData, { selectedIndex }),
		[chartData, selectedIndex]
	);
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			{"value" in valueData && (
				<View>
					<ThemedText style={styles.category}>{valueData.label}</ThemedText>
					<ThemedText
						variant={valueData.type === "income" ? "success" : "danger"}
						shade={500}
						fontFamily="Poppins_700Bold"
						style={styles.value}
					>
						{valueData.value !== 0 ? (valueData.type === "income" ? "+" : "-") : ""}
						{formatAmount(valueData.value)}
					</ThemedText>
				</View>
			)}
			{"income" in valueData && (
				<View style={styles.boxContainer}>
					<ChartValueBox type="income" label="Income" value={valueData.income.value} />
					<ChartValueBox type="expense" label="Expense" value={valueData.expense.value} />
				</View>
			)}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		height: 56,
	},
	category: {
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

export default TransactionCategoriesChartValue;
