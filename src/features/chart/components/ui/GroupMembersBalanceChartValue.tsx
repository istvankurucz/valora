import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useChart } from "../../contexts/ChartContext";
import { useGroupMembersBalanceChartData } from "../../contexts/GroupMembersBalanceChartContext";
import getGroupMembersBalanceChartValue from "../../utils/getGroupMembersBalanceChartValue";
import ChartValueBox from "./ChartValueBox";

type Props = ViewProps;

const GroupMembersBalanceChartValue = ({ style, ...rest }: Props) => {
	//#region Hooks
	const { selectedIndex } = useChart();
	const { data, chartData } = useGroupMembersBalanceChartData();
	//#endregion

	//#region Constants
	const valueData = useMemo(
		() =>
			getGroupMembersBalanceChartValue(chartData, {
				selectedIndex,
				relativeToMaximum: data.relativeToMaximum,
			}),
		[chartData, selectedIndex, data.relativeToMaximum]
	);
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			<ThemedText fontFamily="Poppins_500Medium">
				{"name" in valueData ? valueData.name : "All members"}
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
	value: {
		fontSize: FONT_SIZE[700],
	},
	boxContainer: {
		flexDirection: "row",
		gap: 8,
	},
});

export default GroupMembersBalanceChartValue;
