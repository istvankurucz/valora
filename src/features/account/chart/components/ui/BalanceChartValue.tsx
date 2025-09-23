import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import { StyleSheet, View, ViewProps } from "react-native";
import { useBalanceChartData } from "../../contexts/BalanceChartContext";

type Props = ViewProps;

const BalanceChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { chartData } = useBalanceChartData();
	const { formatAmount } = useFormatAmount();
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
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
					{chartData.income.value > 0 ? "+" : ""}
					{formatAmount(chartData.income.value)}
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
					{chartData.expense.value > 0 ? "-" : ""}
					{formatAmount(chartData.expense.value)}
				</ThemedText>
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
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
	value: {
		fontSize: FONT_SIZE[700],
	},
});

export default BalanceChartValue;
