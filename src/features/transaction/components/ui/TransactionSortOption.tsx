import ThemedText from "@/src/components/ui/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ViewProps } from "react-native";
import { TransactionSortOption as TransactionSortOptionType } from "../../constants/transactionSortOptions";

type Props = ViewProps & {
	option: TransactionSortOptionType;
};

const TransactionSortOption = ({ option, style, ...rest }: Props) => {
	return (
		<View style={[styles.option, style]} {...rest}>
			<Ionicons name={option.icon as any} size={16} />
			<ThemedText>{option.text}</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	option: {
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
	},
});

export default TransactionSortOption;
