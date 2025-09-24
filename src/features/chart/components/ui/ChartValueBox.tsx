import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	type: TransactionType;
	label: string;
	value: number;
};

const ChartValueBox = ({ type, label, value, style, ...rest }: Props) => {
	// #region Hooks
	const { formatAmount } = useFormatAmount();
	//#endregion

	// #region Constants
	const variant = type === "income" ? "success" : "danger";
	const sign = value === 0 ? "" : type === "income" ? "+" : "-";
	//#endregion

	return (
		<View style={[styles.box, style]} {...rest}>
			<ThemedText fontFamily="Poppins_500Medium" style={styles.label}>
				{label}
			</ThemedText>
			<ThemedText
				variant={variant}
				shade={500}
				fontFamily="Poppins_700Bold"
				style={styles.value}
			>
				{sign}
				{formatAmount(value)}
			</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
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

export default ChartValueBox;
