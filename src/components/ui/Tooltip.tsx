import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import ThemedText from "./ThemedText";
import ThemedView, { ThemedViewProps } from "./ThemedView";

type TooltipProps = ThemedViewProps & {
	show: boolean;
	text: string;
};

const Tooltip = ({ show, text, shade, style, children, ...rest }: TooltipProps) => {
	if (!show) return null;
	return (
		<Animated.View entering={FadeInDown.duration(150)} exiting={FadeOutDown.duration(150)}>
			<ThemedView shade={shade ?? 800} style={[styles.tooltip, style]} {...rest}>
				<ThemedText shade={100} style={styles.text}>
					{text}
				</ThemedText>
			</ThemedView>
		</Animated.View>
	);
};

// Styles
const styles = StyleSheet.create({
	tooltip: {
		borderRadius: BORDER_RADIUS[400],
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: "absolute",
		top: -4,
		left: "50%",
		transform: [{ translateX: "-50%" }, { translateY: "-100%" }],
	},
	text: {
		fontSize: FONT_SIZE[400],
		textAlign: "center",
	},
});

export default Tooltip;
