import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useChart } from "../../contexts/ChartContext";
import { useTransactionCategoriesChart } from "../../contexts/TransactionCategoriesChartContext";
import getTransactionCategoriesChartValue from "../../utils/getTransactionCategoriesChartValue";

type Props = ViewProps;

const TransactionCategoriesChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { selectedIndex } = useChart();
	const { data, chartData } = useTransactionCategoriesChart();
	const { formatAmount } = useFormatAmount();
	//#endregion

	// #region Constants
	const valueData = useMemo(
		() => getTransactionCategoriesChartValue(chartData, { selectedIndex, data }),
		[chartData, selectedIndex, data]
	);
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			{"value" in valueData && (
				<View>
					<ThemedText style={styles.category}>{valueData.label}</ThemedText>
					<ThemedText
						variant={
							valueData.value !== 0
								? valueData.type === "income"
									? "success"
									: "danger"
								: undefined
						}
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
					<View style={styles.box}>
						<ThemedText fontFamily="Poppins_500Medium" style={styles.label}>
							Income
						</ThemedText>
						<ThemedText
							variant="success"
							shade={500}
							fontFamily="Poppins_700Bold"
							style={styles.value}
						>
							{valueData.income.value > 0 ? "+" : ""}
							{formatAmount(valueData.income.value)}
						</ThemedText>
					</View>
					<View style={styles.box}>
						<ThemedText fontFamily="Poppins_500Medium" style={styles.label}>
							Expense
						</ThemedText>
						<ThemedText
							variant="danger"
							shade={500}
							fontFamily="Poppins_700Bold"
							style={styles.value}
						>
							{valueData.expense.value > 0 ? "-" : ""}
							{formatAmount(valueData.expense.value)}
						</ThemedText>
					</View>
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
	box: {
		flex: 1,
		alignItems: "center",
	},
	label: {
		fontSize: FONT_SIZE[400],
	},
});

export default TransactionCategoriesChartValue;
