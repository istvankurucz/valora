import { StyleSheet, View, ViewProps } from "react-native";
import { useBalanceChartData } from "../../contexts/BalanceChartContext";
import ChartValueBox from "./ChartValueBox";

type Props = ViewProps;

const BalanceChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { chartData } = useBalanceChartData();
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			<ChartValueBox type="income" label="Income" value={chartData.income.value} />
			<ChartValueBox type="expense" label="Expense" value={chartData.expense.value} />
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 16,
	},
});

export default BalanceChartValue;
