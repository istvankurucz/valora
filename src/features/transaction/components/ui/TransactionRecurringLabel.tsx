import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

const TransactionRecurringLabel = () => {
	// #region Hooks
	const recurringIconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<ThemedView variant="info" shade={100} style={styles.container}>
			<Ionicons name="sync-outline" size={12} color={recurringIconColor} />
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
		borderRadius: BORDER_RADIUS[999],
		padding: 4,
		position: "absolute",
		top: -4,
		left: -4,
	},
	text: {
		fontSize: FONT_SIZE[400],
		textTransform: "uppercase",
	},
});

export default TransactionRecurringLabel;
