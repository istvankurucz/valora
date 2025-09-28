import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import useUpdateInputColors from "@/src/hooks/useUpdateInputColors";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef, useState } from "react";
import { FocusEvent, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import IconUnderlay from "../../ui/Underlay/IconUnderlay";

export type InputProps = TextInputProps & {
	variant?: ColorVariant;
	search?: boolean;
};

const Input = forwardRef<TextInput, InputProps>(
	(
		{
			variant = "neutral",
			search,
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
		const defaultBackgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
		const searchBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
		const placeholderColor = useThemeColor({ variant: "neutral", shade: 600 });
		const color = useThemeColor({ variant: "neutral", shade: 800 });
		const iconColor = useThemeColor({ variant: "neutral", shade: 600 });
		const clearIconColor = useThemeColor({ variant: "neutral", shade: 600 });
		const clearIconBackground = useThemeColor({ variant: "neutral", shade: 300 });

		const defaultBorderWidth = 2;
		const focusedBorderWidth = 3;
		const borderWidth = useSharedValue(defaultBorderWidth);

		const { borderColor: inputBorderColor } = useInputColors({ variant });

		const borderColor = useSharedValue(
			rest.value ? inputBorderColor.focused : inputBorderColor.default
		);
		useUpdateInputColors({ borderColor, inputBorderColor, value: rest.value });

		const animatedViewStyle = useAnimatedStyle(() => {
			return { borderWidth: borderWidth.get(), borderColor: borderColor.get() };
		}, []);
		//#endregion

		// #region Functions
		function handleFocus(e: FocusEvent) {
			// Set animated values
			borderColor.set(withTiming(inputBorderColor.focused));
			borderWidth.set(withTiming(focusedBorderWidth));

			// Run event handler prop
			onFocus?.(e);
		}

		function handleBlur(e: FocusEvent) {
			// Set animated values
			if (!rest.value) borderColor.set(withTiming(inputBorderColor.default));
			borderWidth.set(withTiming(defaultBorderWidth));

			// Run event handler prop
			onBlur?.(e);
		}

		function handleIconPress() {
			setSecure((secure) => !secure);
		}

		function handleClearPress() {
			rest.onChangeText?.("");
		}
		//#endregion

		return (
			<Animated.View
				style={[
					styles.container,
					animatedViewStyle,
					{ backgroundColor: search ? searchBackgroundColor : defaultBackgroundColor },
				]}
			>
				{search && <Feather name="search" size={20} color={iconColor} />}

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

				{search && (
					<IconUnderlay
						style={[styles.clear, { backgroundColor: clearIconBackground }]}
						onPress={handleClearPress}
					>
						<Ionicons name="close" size={10} color={clearIconColor} />
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
	clear: {
		padding: 8,
	},
});

export default Input;
