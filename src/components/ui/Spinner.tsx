import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { StyleSheet, ViewProps } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

type Props = ViewProps & {
	size?: number;
	borderWidth?: number;
	color?: string;
};

const Spinner = ({ size = 24, borderWidth = 2, color, style, ...rest }: Props) => {
	// #region Hooks
	const defaultColor = useThemeColor({ variant: "neutral", shade: 100 });

	const rotate = useSharedValue("0deg");
	rotate.value = withRepeat(withTiming("360deg", { duration: 500, easing: Easing.linear }), 0);
	const spinnerAnimatedSytle = useAnimatedStyle(() => ({
		transform: [{ rotate: rotate.value }],
	}));
	//#endregion

	return (
		<Animated.View
			style={[
				styles.spinner,
				{
					width: size,
					height: size,
					borderWidth,
					borderTopColor: color ?? defaultColor,
					borderRightColor: color ?? defaultColor,
					borderBottomColor: color ?? defaultColor,
				},
				spinnerAnimatedSytle,
			]}
			{...rest}
		></Animated.View>
	);
};

// Styles
const styles = StyleSheet.create({
	spinner: {
		borderRadius: BORDER_RADIUS[999],
		borderLeftColor: "transparent",
	},
});

export default Spinner;
