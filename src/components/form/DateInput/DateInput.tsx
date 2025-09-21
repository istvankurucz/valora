import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import { INITIAL_DATE } from "@/src/constants/initialDate";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import useUpdateInputColors from "@/src/hooks/useUpdateInputColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, {
	AndroidNativeProps,
	DateTimePickerEvent,
	IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedText from "../../ui/ThemedText";
import IconUnderlay from "../../ui/Underlay/IconUnderlay";

type DateTimePickerProps = IOSNativeProps | AndroidNativeProps;
export type DateInputProps = DateTimePickerProps & {
	variant?: ColorVariant;
	style?: ViewStyle;
	onValueChange?: (newDate: Date) => void;
};

const DateInput = ({
	variant = "neutral",
	mode,
	maximumDate,
	style,
	value,
	onValueChange,
	onChange,
	...rest
}: DateInputProps) => {
	// #region States
	const [show, setShow] = useState(false);
	//#endregion

	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 600 });
	const iconBackgroundColor = useThemeColor({ variant: "neutral", shade: 300 });

	const defaultBorderWidth = 2;
	const focusedBorderWidth = 3;
	const borderWidth = useSharedValue(defaultBorderWidth);

	const { borderColor: inputBorderColor } = useInputColors({ variant });
	const borderColor = useSharedValue(value ? inputBorderColor.focused : inputBorderColor.default);
	useUpdateInputColors({
		borderColor,
		inputBorderColor,
		value: value === INITIAL_DATE ? undefined : value,
	});

	const animatedViewStyle = useAnimatedStyle(() => {
		return { borderWidth: borderWidth.value, borderColor: borderColor.value };
	}, []);
	//#endregion

	// #region Functions
	function handleShowPress() {
		// Set animated values
		borderColor.value = withTiming(inputBorderColor.focused);
		borderWidth.value = withTiming(focusedBorderWidth);

		// Show picker
		setShow(true);
	}

	function handleChange(_?: DateTimePickerEvent, date?: Date) {
		// Run event handler
		if (date) onValueChange?.(date);

		// Set animated values
		if (!value) borderColor.value = withTiming(inputBorderColor.default);
		borderWidth.value = withTiming(defaultBorderWidth);

		// Hide picker
		setShow(false);
	}

	function handleRemovePress() {
		handleChange(undefined, INITIAL_DATE);
	}
	//#endregion

	return (
		<View>
			<Pressable onPress={handleShowPress}>
				<Animated.View style={[styles.container, animatedViewStyle, style]}>
					<ThemedText style={styles.value}>
						{value === INITIAL_DATE ? "No date" : value.toLocaleDateString()}
					</ThemedText>

					{value !== INITIAL_DATE && (
						<IconUnderlay
							style={[styles.icon, { backgroundColor: iconBackgroundColor }]}
							onPress={handleRemovePress}
						>
							<Ionicons name="close" size={12} color={iconColor} />
						</IconUnderlay>
					)}
				</Animated.View>
			</Pressable>

			{show && (
				<DateTimePicker
					mode="date"
					value={value === INITIAL_DATE ? new Date() : value}
					onChange={handleChange}
					maximumDate={maximumDate ?? new Date()}
					{...rest}
				/>
			)}
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
