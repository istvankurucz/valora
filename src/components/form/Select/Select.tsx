import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import useUpdateInputColors from "@/src/hooks/useUpdateInputColors";
import { SelectOption } from "@/src/types/uiTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, ViewProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedText from "../../ui/ThemedText";
import ThemedView from "../../ui/ThemedView";
import IconUnderlay from "../../ui/Underlay/IconUnderlay";
import Underlay from "../../ui/Underlay/Underlay";

export type SelectProps<T> = ViewProps & {
	variant?: ColorVariant;
	disabled?: boolean;
	options: SelectOption<T>[];
	value?: T;
	onValueChange?: (newValue: T) => void;
};

const Select = <T,>({
	variant = "neutral",
	disabled,
	value,
	onValueChange,
	options,
	style,
	...rest
}: SelectProps<T>) => {
	//#region States
	const [showOptions, setShowOptions] = useState(false);
	//#endregion

	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 600 });

	const defaultBorderWidth = 2;
	const focusedBorderWidth = 3;
	const borderWidth = useSharedValue(defaultBorderWidth);

	const { borderColor: inputBorderColor } = useInputColors({ variant });
	const borderColor = useSharedValue(value ? inputBorderColor.focused : inputBorderColor.default);
	useUpdateInputColors({ borderColor, inputBorderColor, value });

	const animatedViewStyle = useAnimatedStyle(() => {
		return { borderWidth: borderWidth.value, borderColor: borderColor.value };
	}, []);
	//#endregion

	// #region Constants
	const valueLabel = options.find((option) => option.value === value)?.label;
	//#endregion

	// #region Functions
	function handleSelectPress() {
		// Set animated values
		borderColor.value = withTiming(inputBorderColor.focused);
		borderWidth.value = withTiming(focusedBorderWidth);

		// Show option
		setShowOptions(true);
	}

	function handleChange(value: T) {
		// Run event handler
		onValueChange?.(value);

		// Hide options
		setShowOptions(false);
	}

	function handleRequestClose() {
		// Set animated values
		if (!value) borderColor.value = withTiming(inputBorderColor.default);
		borderWidth.value = withTiming(defaultBorderWidth);

		// Hide options
		setShowOptions(false);
	}
	//#endregion

	return (
		<Fragment>
			<Pressable disabled={disabled} onPress={handleSelectPress}>
				<Animated.View
					style={[styles.container, { backgroundColor }, animatedViewStyle, style]}
					{...rest}
				>
					<ThemedText style={styles.value}>{valueLabel}</ThemedText>

					<IconUnderlay style={styles.icon} onPress={handleSelectPress}>
						<Ionicons name="caret-down" size={16} color={iconColor} />
					</IconUnderlay>
				</Animated.View>
			</Pressable>

			<Modal
				visible={showOptions}
				backdropColor="transparent"
				onRequestClose={handleRequestClose}
			>
				<ScrollView style={styles.modal}>
					<ThemedView style={styles.options}>
						{options.map((option, i) => (
							<Underlay key={i} onPress={() => handleChange(option.value)}>
								<ThemedView
									shade={value === option.value ? 400 : undefined}
									style={styles.option}
								>
									{option.label}
								</ThemedView>
							</Underlay>
						))}
					</ThemedView>
				</ScrollView>
			</Modal>
		</Fragment>
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
		marginRight: -8,
	},
	modal: {
		marginHorizontal: 24,
		marginVertical: 48,
	},
	options: {
		flex: 1,
		borderRadius: BORDER_RADIUS[500],
		paddingVertical: 16,
	},
	option: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
});

export default Select;
