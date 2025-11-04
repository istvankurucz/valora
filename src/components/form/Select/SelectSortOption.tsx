import ThemedText from "@/src/components/ui/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	option: { text: string; icon: string };
};

const SelectSortOption = ({ option, style, ...rest }: Props) => {
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

export default SelectSortOption;
