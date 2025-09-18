import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ThemedView from "../ThemedView";
import Underlay, { UnderlayProps } from "../Underlay/Underlay";
import ListItemIcon from "./ListItemIcon";
import ListItemInfo from "./ListItemInfo";
import ListItemLabel from "./ListItemLabel";
import ListItemMain from "./ListItemMain";
import ListItemMore from "./ListItemMore";

export type ListItemProps = UnderlayProps;

const ListItem = ({
	underlayColor,
	style,
	onPressIn,
	onPressOut,
	children,
	...rest
}: ListItemProps) => {
	// #region Hooks
	const defaultUnderlayColor = useThemeColor({ variant: "neutral", shade: 300 });

	const scale = useSharedValue(1);
	const containerAnimatedStyle = useAnimatedStyle(() => {
		return { transform: [{ scale: scale.value }] };
	}, []);
	//#endregion

	// #region Functions
	function handlePressIn(e: GestureResponderEvent) {
		// Set animated value
		scale.value = withTiming(0.95);

		// Run event handler
		onPressIn?.(e);
	}

	function handlePressOut(e: GestureResponderEvent) {
		// Set animated value
		scale.value = withTiming(1);

		// Run event handler
		onPressOut?.(e);
	}
	//#endregion

	return (
		<Animated.View style={[styles.container, containerAnimatedStyle]}>
			<Underlay
				underlayColor={underlayColor ?? defaultUnderlayColor}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...rest}
			>
				<ThemedView shade={100} style={[styles.inner, style]}>
					{children}
				</ThemedView>
			</Underlay>
		</Animated.View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS[500],
		overflow: "hidden",
	},
	inner: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
		padding: 8,
	},
});

// Children
ListItem.Icon = ListItemIcon;
ListItem.Main = ListItemMain;
ListItem.Label = ListItemLabel;
ListItem.Info = ListItemInfo;
ListItem.More = ListItemMore;

export default ListItem;
