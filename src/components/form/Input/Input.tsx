import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import useUpdateInputColors from "@/src/hooks/useUpdateInputColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef, useState } from "react";
import { FocusEvent, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import IconUnderlay from "../../ui/Underlay/IconUnderlay";

export type InputProps = TextInputProps & {
	variant?: ColorVariant;
};

const Input = forwardRef<TextInput, InputProps>(
	(
		{
			variant = "neutral",
			secureTextEntry,
			placeholderTextColor,
			style,
			onFocus,
			onBlur,
			...rest
		},
		ref
	) => {
		// #region States
		const [secure, setSecure] = useState(secureTextEntry ?? false);
		//#endregion

		// #region Hooks
		const backgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
		const placeholderColor = useThemeColor({ variant: "neutral", shade: 600 });
		const color = useThemeColor({ variant: "neutral", shade: 800 });
		const iconColor = useThemeColor({ variant: "neutral", shade: 600 });

		const defaultBorderWidth = 2;
		const focusedBorderWidth = 3;
		const borderWidth = useSharedValue(defaultBorderWidth);

		const { borderColor: inputBorderColor } = useInputColors({ variant });

		const borderColor = useSharedValue(
			rest.value ? inputBorderColor.focused : inputBorderColor.default
		);
		useUpdateInputColors({ borderColor, inputBorderColor, value: rest.value });

		const animatedViewStyle = useAnimatedStyle(() => {
			return { borderWidth: borderWidth.value, borderColor: borderColor.value };
		}, []);
		//#endregion

		// #region Functions
		function handleFocus(e: FocusEvent) {
			// Set animated values
			borderColor.value = withTiming(inputBorderColor.focused);
			borderWidth.value = withTiming(focusedBorderWidth);

			// Run event handler prop
			onFocus?.(e);
		}

		function handleBlur(e: FocusEvent) {
			// Set animated values
			if (!rest.value) borderColor.value = withTiming(inputBorderColor.default);
			borderWidth.value = withTiming(defaultBorderWidth);

			// Run event handler prop
			onBlur?.(e);
		}

		function handleIconPress() {
			setSecure((secure) => !secure);
		}
		//#endregion

		return (
			<Animated.View style={[styles.container, animatedViewStyle, { backgroundColor }]}>
				<TextInput
					secureTextEntry={secureTextEntry ? secure : undefined}
					placeholderTextColor={placeholderTextColor ?? placeholderColor}
					style={[styles.input, { color }, style]}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...rest}
					ref={ref}
				/>
				{secureTextEntry && (
					<IconUnderlay hitSlop={4} style={styles.icon} onPress={handleIconPress}>
						<View>
							{secure && <Ionicons name="eye" size={20} color={iconColor} />}
							{!secure && <Ionicons name="eye-off" size={20} color={iconColor} />}
						</View>
					</IconUnderlay>
				)}
			</Animated.View>
		);
	}
);

// Display name
Input.displayName = "Input";

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: BORDER_RADIUS[500],
		paddingHorizontal: 12,
		overflow: "hidden",
	},
	input: {
		flex: 1,
		fontFamily: "Poppins_400Regular",
		paddingVertical: 14,
	},
	icon: {
		marginRight: -8,
	},
});

export default Input;
