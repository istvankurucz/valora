import ThemedText from "@/src/components/ui/ThemedText";
import Underlay, { UnderlayProps } from "@/src/components/ui/Underlay/Underlay";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import { Transaction } from "../../types/transactionTypes";

type Props = UnderlayProps & {
	transaction: Transaction;
};

const LatestTransactionOption = ({ transaction, style, ...rest }: Props) => {
	// #region Hooks
	const borderColor = useThemeColor({ variant: "neutral", shade: 400 });
	//#endregion

	return (
		<Underlay style={[styles.container, { borderColor }, style]} {...rest}>
			<View>
				<ThemedText style={styles.text}>{transaction.label}</ThemedText>
			</View>
		</Underlay>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderRadius: BORDER_RADIUS[200],
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	text: {
		fontSize: FONT_SIZE[400],
	},
});

export default LatestTransactionOption;
