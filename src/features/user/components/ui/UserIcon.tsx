import ThemedView, { ThemedViewProps } from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

type Props = ThemedViewProps;

const UserIcon = ({ shade = 200, style, ...rest }: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 700 });
	//#endregion

	return (
		<ThemedView shade={shade} style={styles.icon} {...rest}>
			<Ionicons name="person-outline" size={20} color={iconColor} />
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	icon: {
		borderRadius: BORDER_RADIUS[999],
		padding: 12,
	},
});

export default UserIcon;
