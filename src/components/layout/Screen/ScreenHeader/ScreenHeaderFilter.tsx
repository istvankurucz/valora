import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import Screen from "../Screen";
import { ScreenHeaderIconUnderlayProps } from "./ScreenHeaderIconUnderlay";

type Props = ScreenHeaderIconUnderlayProps & {
	filterCount: number;
};

const ScreenHeaderFilter = ({ filterCount, ...rest }: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<Screen.Header.IconUnderlay {...rest}>
			<View>
				<Ionicons name="funnel-outline" size={20} color={iconColor} />
				{filterCount > 0 && (
					<ThemedView variant="danger" shade={400} style={styles.count}>
						<ThemedText fontFamily="Poppins_500Medium" shade={100} style={styles.countText}>
							{filterCount}
						</ThemedText>
					</ThemedView>
				)}
			</View>
		</Screen.Header.IconUnderlay>
	);
};

// Styles
const styles = StyleSheet.create({
	count: {
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BORDER_RADIUS[999],
		position: "absolute",
		top: -12,
		right: -12,
	},
	countText: {
		fontSize: FONT_SIZE[300],
		verticalAlign: "middle",
		marginTop: 2,
	},
});

export default ScreenHeaderFilter;
