import Underlay from "@/src/components/ui/Underlay/Underlay";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { SegmentedControlOption } from "@/src/types/uiTypes";
import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedText from "../../ui/ThemedText";
import ThemedView, { ThemedViewProps } from "../../ui/ThemedView";

export type SegmentedControlProps<T> = ThemedViewProps & {
	value?: T;
	onValueChange?: (newValue: T) => void;
	options: SegmentedControlOption<T>[];
};

const SegmentedControl = <T,>({
	value,
	onValueChange,
	options,
	shade,
	style,
	...rest
}: SegmentedControlProps<T>) => {
	// #region Constants
	const valueLabel = options.find((option) => option.value === value)?.label;
	const getLeftValue = useCallback(
		(value?: T): `${number}%` => {
			const valueIndex = options.findIndex((option) => option.value === value);
			return `${(valueIndex * 100) / options.length}%`;
		},
		[options]
	);
	//#endregion

	// #region Hooks
	const left = useSharedValue(getLeftValue(value));
	const animatedSelectedStyle = useAnimatedStyle(() => {
		return { left: left.value };
	}, []);

	useEffect(() => {
		left.value = withTiming(getLeftValue(value));
	}, [left, value, getLeftValue]);
	//#endregion

	// #region Functions
	function handleOptionPress(value: T) {
		// Run event handler
		onValueChange?.(value);
	}
	//#endregion

	return (
		<ThemedView shade={shade ?? 100} style={[styles.container, style]} {...rest}>
			{options.map((option, i) => (
				<Underlay
					key={i}
					style={styles.optionContainer}
					onPress={() => handleOptionPress(option.value)}
				>
					<ThemedView shade={shade ?? 100} style={styles.option}>
						<ThemedText shade={600}>{option.label}</ThemedText>
					</ThemedView>
				</Underlay>
			))}

			<Animated.View
				style={[
					styles.selectedContainer,
					{
						width: `${100 / options.length}%`,
					},
					animatedSelectedStyle,
				]}
			>
				<ThemedView shade={800} style={styles.selected}>
					<ThemedText shade={100}>{valueLabel}</ThemedText>
				</ThemedView>
			</Animated.View>
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderRadius: BORDER_RADIUS[999],
	},
	optionContainer: {
		flex: 1,
		borderRadius: BORDER_RADIUS[999],
		overflow: "hidden",
	},
	option: {
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	selectedContainer: {
		borderRadius: BORDER_RADIUS[999],
		overflow: "hidden",
		position: "absolute",
		top: 0,
		bottom: 0,
		zIndex: 1,
	},
	selected: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SegmentedControl;
