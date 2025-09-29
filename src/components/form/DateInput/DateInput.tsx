import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import { INITIAL_DATE } from "@/src/constants/initialDate";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import useUpdateInputColors from "@/src/hooks/useUpdateInputColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedText from "../../ui/ThemedText";
import IconUnderlay from "../../ui/Underlay/IconUnderlay";

export type DateInputProps = DatePickerProps & {
	variant?: ColorVariant;
	style?: ViewStyle;
	onValueChange?: (newDate: Date) => void;
};

const DateInput = ({
	variant = "neutral",
	mode,
	maximumDate,
	dividerColor,
	buttonColor,
	style,
	date,
	onValueChange,
	...rest
}: DateInputProps) => {
	// #region States
	const [show, setShow] = useState(false);
	//#endregion

	// #region Hooks
	const dateInputColor = useThemeColor({ variant: "neutral", shade: 800 });
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 600 });
	const iconBackgroundColor = useThemeColor({ variant: "neutral", shade: 300 });

	const defaultBorderWidth = 2;
	const focusedBorderWidth = 3;
	const borderWidth = useSharedValue(defaultBorderWidth);

	const { borderColor: inputBorderColor } = useInputColors({ variant });
	const borderColor = useSharedValue(date ? inputBorderColor.focused : inputBorderColor.default);
	useUpdateInputColors({
		borderColor,
		inputBorderColor,
		value: date === INITIAL_DATE ? undefined : date,
	});

	const animatedViewStyle = useAnimatedStyle(() => {
		return { borderWidth: borderWidth.get(), borderColor: borderColor.get() };
	}, []);
	//#endregion

	// #region Constants
	const formattedDate =
		date === INITIAL_DATE
			? "No date"
			: mode === "time"
			? format(date, "HH:mm")
			: mode === "date"
			? format(date, "yyyy.MM.dd")
			: format(date, "yyyy.MM.dd HH:mm");
	//#endregion

	// #region Functions
	function handleShowPress() {
		// Set animated values
		borderColor.set(withTiming(inputBorderColor.focused));
		borderWidth.set(withTiming(focusedBorderWidth));

		// Show picker
		setShow(true);
	}

	function handleConfirm(newDate: Date) {
		// Run event handler
		onValueChange?.(newDate);

		// Set animated values
		if (newDate === INITIAL_DATE) borderColor.set(withTiming(inputBorderColor.default));
		borderWidth.set(withTiming(defaultBorderWidth));

		// Hide picker
		setShow(false);
	}

	function handleCancelPress() {
		// Set animated values
		if (date === INITIAL_DATE) borderColor.set(withTiming(inputBorderColor.default));
		borderWidth.set(withTiming(defaultBorderWidth));

		// Hide picker
		setShow(false);
	}

	function handleRemovePress() {
		handleConfirm(INITIAL_DATE);
	}
	//#endregion

	return (
		<View>
			<Pressable onPress={handleShowPress}>
				<Animated.View
					style={[styles.container, { backgroundColor }, animatedViewStyle, style]}
				>
					<ThemedText style={styles.value}>{formattedDate}</ThemedText>

					{date !== INITIAL_DATE && (
						<IconUnderlay
							style={[styles.icon, { backgroundColor: iconBackgroundColor }]}
							onPress={handleRemovePress}
						>
							<Ionicons name="close" size={12} color={iconColor} />
						</IconUnderlay>
					)}
				</Animated.View>
			</Pressable>

			<DatePicker
				modal
				open={show}
				date={date === INITIAL_DATE ? new Date() : date}
				maximumDate={maximumDate ?? new Date()}
				buttonColor={buttonColor ?? dateInputColor}
				dividerColor={dividerColor ?? dateInputColor}
				onConfirm={handleConfirm}
				onCancel={handleCancelPress}
				{...rest}
			/>
		</View>
	);
};

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
	value: {
		paddingVertical: 14,
	},
	icon: {
		padding: 8,
		marginRight: -4,
	},
});

export default DateInput;
