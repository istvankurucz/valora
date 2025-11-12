import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { useEffect } from "react";
import {
	GestureResponderEvent,
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	TransformsStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type SwitchProps = PressableProps & {
	trackColor?: { false: string; true: string };
	thumbColor?: string;
	value?: boolean;
	onValueChange?: (value: boolean) => void;
	style?: StyleProp<PressableProps>;
};

const Switch = ({
	trackColor,
	thumbColor,
	value,
	onValueChange,
	hitSlop,
	style,
	onPress,
	...rest
}: SwitchProps) => {
	// #region Hooks
	const defaultTrackColorFalse = useThemeColor({ variant: "neutral", shade: 500 });
	const defaultTrackColorTrue = useThemeColor({ variant: "neutral", shade: 800 });
	const defaultThumbColor = useThemeColor({ variant: "neutral", shade: 100 });

	const appliedTrackColor = useSharedValue(getAppliedTrackColor());
	const switchPosition = useSharedValue(value ? "100%" : "0%");

	const animatedTrackStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: appliedTrackColor.get(),
		};
	}, []);
	const animatedThumbStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: switchPosition.get() }],
		} as { transform: TransformsStyle["transform"] };
	}, []);

	useEffect(() => {
		switchPosition.set(withTiming(value ? "150%" : "0%"));
		appliedTrackColor.set(withTiming(getAppliedTrackColor()));
	}, [value]);
	//#endregion

	// #region Constants
	const appliedThumbColor = thumbColor ?? defaultThumbColor;
	//#endregion

	// #region Functions
	function getAppliedTrackColor(): string {
		if (trackColor) return trackColor[value ? "true" : "false"];
		return value ? defaultTrackColorTrue : defaultTrackColorFalse;
	}

	function handlePress(e: GestureResponderEvent) {
		// Toggle the switch value
		onValueChange?.(!value);

		// Call any additional onPress handler
		onPress?.(e);
	}
	//#endregion

	return (
		<AnimatedPressable
			hitSlop={hitSlop ?? 4}
			style={[styles.track, animatedTrackStyle, style]}
			onPress={handlePress}
			{...rest}
		>
			<Animated.View
				style={[styles.thumb, { backgroundColor: appliedThumbColor }, animatedThumbStyle]}
			></Animated.View>
		</AnimatedPressable>
	);
};

// Styles
const TRACK_HEIGHT = 24;
const TRACK_WIDTH = TRACK_HEIGHT * 2;

const THUMB_SIZE = 16;
const THUMB_PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2;

const styles = StyleSheet.create({
	track: {
		width: TRACK_WIDTH,
		height: TRACK_HEIGHT,
		justifyContent: "center",
		borderRadius: BORDER_RADIUS[999],
	},
	thumb: {
		width: THUMB_SIZE,
		height: THUMB_SIZE,
		borderRadius: BORDER_RADIUS[999],
		position: "absolute",
		top: THUMB_PADDING,
		left: THUMB_PADDING,
	},
});

export default Switch;
