import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import useButtonColors from "@/src/hooks/useButtonColors";
import { Fragment, ReactNode } from "react";
import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Spinner from "./Spinner";
import { ThemedTextProps } from "./ThemedText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
	variant?: ColorVariant;
	outlined?: boolean;
	title?: string;
	IconComponent?: ReactNode;
	loading?: boolean;
	titleStyle?: ThemedTextProps;
};

const Button = ({
	variant = "neutral",
	outlined,
	title,
	IconComponent,
	loading,
	disabled,
	style,
	onPressIn,
	onPressOut,
	titleStyle,
	...rest
}: Props) => {
	//#region Hooks
	const buttonColors = useButtonColors({ variant });

	const titleColor = useSharedValue(
		outlined ? buttonColors.backgroundColor.default : buttonColors.titleColor.default
	);
	const backgroundColor = useSharedValue(
		outlined ? "transparent" : buttonColors.backgroundColor.default
	);
	const borderColor = useSharedValue(
		outlined ? buttonColors.backgroundColor.default : "transparent"
	);
	const buttonAnimatedStyle = useAnimatedStyle(() => {
		return { backgroundColor: backgroundColor.value, borderColor: borderColor.value };
	}, []);
	const buttonTitleAnimatedStyle = useAnimatedStyle(() => {
		return { color: titleColor.value };
	}, []);
	//#endregion

	// #region Functions
	function handlePressIn(e: GestureResponderEvent) {
		// Set animated properties
		backgroundColor.value = withTiming(buttonColors.backgroundColor.active);
		borderColor.value = withTiming(buttonColors.backgroundColor.active);
		if (outlined) titleColor.value = withTiming(buttonColors.titleColor.default);

		// Run event handler
		onPressIn?.(e);
	}

	function handlePressOut(e: GestureResponderEvent) {
		// Set animated properties
		borderColor.value = withTiming(buttonColors.backgroundColor.default);
		if (outlined) {
			titleColor.value = withTiming(buttonColors.backgroundColor.default);
			backgroundColor.value = withTiming("transparent");
		} else {
			backgroundColor.value = withTiming(buttonColors.backgroundColor.default);
		}

		// Run event handler
		onPressOut?.(e);
	}
	//#endregion

	return (
		<AnimatedPressable
			disabled={disabled ?? loading}
			style={[styles.button, buttonAnimatedStyle, style]}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			<View style={styles.content}>
				{loading && <Spinner />}
				{!loading && (
					<Fragment>
						{IconComponent}
						{title && (
							<Animated.Text style={[styles.title, buttonTitleAnimatedStyle, titleStyle]}>
								{title}
							</Animated.Text>
						)}
					</Fragment>
				)}
			</View>
		</AnimatedPressable>
	);
};

// Styles
const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
		borderRadius: BORDER_RADIUS[500],
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	content: {
		flexDirection: "row",
		gap: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontFamily: "Poppins_500Medium",
	},
});

export default Button;
