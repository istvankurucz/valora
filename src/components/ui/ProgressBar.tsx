import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
	ColorValue,
	DimensionValue,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = TouchableOpacityProps & {
	vertical?: boolean;
	value: number;
	maxValue: number;
	barColors?: string | [ColorValue, ColorValue, ...ColorValue[]];
	backgroundColor?: string;
};

const ProgressBar = ({
	vertical,
	value,
	maxValue,
	barColors,
	backgroundColor = "transparent",
	activeOpacity = 0.5,
	style,
	...rest
}: Props) => {
	// #region Hooks
	const barColor = useThemeColor({ variant: "neutral", shade: 700 });

	const barSize = useSharedValue("0%");
	const barAnimatedStyles = useAnimatedStyle(() => {
		if (vertical) return { height: barSize.get() as DimensionValue };
		else return { width: barSize.get() as DimensionValue };
	}, []);

	useEffect(() => {
		barSize.set(withTiming(`${maxValue === 0 ? 0 : (value / maxValue) * 100}%`));
	}, [barSize, value, maxValue]);
	//#endregion

	// #region Constants
	const showGradient = barColors && typeof barColors !== "string";
	//#endregion

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			style={[
				styles.background,
				vertical ? styles.backgroundV : styles.backgroundH,
				{ backgroundColor },
				style,
			]}
			{...rest}
		>
			{showGradient && (
				<Animated.View
					style={[styles.bar, vertical ? styles.barV : styles.barH, barAnimatedStyles]}
				>
					<LinearGradient
						colors={barColors}
						start={{ x: 0, y: 0 }}
						end={{ x: vertical ? 0 : 1, y: vertical ? 1 : 0 }}
						style={{ flex: 1, width: "100%", height: "100%" }}
					></LinearGradient>
				</Animated.View>
			)}
			{!showGradient && (
				<Animated.View
					style={[
						styles.bar,
						vertical ? styles.barV : styles.barH,
						{ backgroundColor: barColors ?? barColor },
						barAnimatedStyles,
					]}
				></Animated.View>
			)}
		</TouchableOpacity>
	);
};

// Styles
const styles = StyleSheet.create({
	background: {
		borderRadius: BORDER_RADIUS[999],
		overflow: "hidden",
	},
	backgroundH: {
		height: 24,
	},
	backgroundV: {
		width: 24,
	},
	bar: {
		borderRadius: BORDER_RADIUS[999],
		position: "absolute",
		bottom: 0,
		left: 0,
	},
	barH: {
		top: 0,
	},
	barV: {
		right: 0,
	},
});

export default ProgressBar;
