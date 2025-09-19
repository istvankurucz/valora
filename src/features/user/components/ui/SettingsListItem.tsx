import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import Underlay, { UnderlayProps } from "@/src/components/ui/Underlay/Underlay";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

type Props = UnderlayProps & {
	icon: string;
	label: string;
};

const SettingsListItem = ({ icon, label, underlayColor, style, children, ...rest }: Props) => {
	// #region Hooks
	const underayColor = useThemeColor({ variant: "neutral", shade: 300 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	const arrowIconColor = useThemeColor({ variant: "neutral", shade: 500 });
	//#endregion

	return (
		<Underlay underlayColor={underayColor} style={[styles.container, style]} {...rest}>
			<View style={styles.inner}>
				<ThemedView shade={300} style={[styles.iconContainer, style]} {...rest}>
					<Ionicons name={icon as any} size={16} color={iconColor} />
				</ThemedView>
				<View style={styles.main}>
					<ThemedText>{label}</ThemedText>
				</View>
				<Ionicons name="arrow-forward" size={16} color={arrowIconColor} />
			</View>
		</Underlay>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginHorizontal: -16,
	},
	inner: {
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
	},
	iconContainer: {
		borderRadius: BORDER_RADIUS[999],
		padding: 12,
	},
	main: {
		flex: 1,
	},
});

export default SettingsListItem;
