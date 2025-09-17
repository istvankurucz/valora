import ThemedView from "@/src/components/ui/ThemedView";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

type Props = {
	focused: boolean;
};

const SpecialTabBarIcon = ({ focused }: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 100 });
	const shadowColor = useThemeColor({ variant: "neutral", shade: 500 });
	//#endregion

	return (
		<ThemedView
			variant="neutral"
			shade={focused ? 900 : 800}
			style={[
				styles.container,
				{ boxShadow: [{ offsetX: 0, offsetY: 2, color: shadowColor, blurRadius: 8 }] },
			]}
		>
			<Ionicons name="add" color={iconColor} size={24} />
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 12,
	},
});

export default SpecialTabBarIcon;
