import IconBox from "@/src/components/ui/IconBox";
import ThemedText from "@/src/components/ui/ThemedText";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { StyleSheet, View, ViewProps } from "react-native";
import { TransactionCategory } from "../../types/transactionCategoryTypes";

type Props = ViewProps & {
	transactionCategory: TransactionCategory;
};

const TransactionCategoryOption = ({ transactionCategory, style, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			<IconBox icon={{ ...transactionCategory.icon, size: 20 }} style={styles.iconBox} />
			<ThemedText>{capitalizeString(transactionCategory.name)}</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
	},
	iconBox: {
		width: 48,
		height: 48,
	},
});

export default TransactionCategoryOption;
