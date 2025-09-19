import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView, { ThemedViewProps } from "@/src/components/ui/ThemedView";
import IconUnderlay from "@/src/components/ui/Underlay/IconUnderlay";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useFeedback } from "../../contexts/FeedbackContext";

const TRANSLATION_X_THRESHOLD = 100;

type Props = ThemedViewProps;

const Feedback = ({ style, ...rest }: Props) => {
	// #region Hooks
	const { feedback, show, hideFeedback } = useFeedback();

	const shadowColor = useThemeColor({ variant: "neutral", shade: 400 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 100 });
	const closeIconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	// #region Constants
	const iconName =
		feedback?.type === "success"
			? "checkmark"
			: feedback?.type === "error"
			? "close"
			: "information";

	const translateX = useSharedValue(0);
	const opacity = useSharedValue(1);
	const gesture = Gesture.Pan()
		.onUpdate((e) => {
			opacity.value = (700 - Math.abs(e.translationX)) / 700;
			translateX.value = e.translationX;
		})
		.onEnd((e) => {
			// Set feeback back to original state
			if (Math.abs(e.translationX) < TRANSLATION_X_THRESHOLD) {
				translateX.value = withTiming(0);
				opacity.value = withTiming(1);
			}
			// Hide feedback
			else {
				runOnJS(hideFeedback)();

				setTimeout(() => {
					// Reset animated properties
					translateX.value = 0;
					opacity.value = 1;
				}, 500);
			}
		});

	const containerAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: opacity.value, transform: [{ translateX: translateX.value }] };
	}, []);
	//#endregion

	// #region Functions
	function onClosePress() {
		// Animation
		translateX.value = withTiming(500, { duration: 300 });
		opacity.value = withTiming(0, { duration: 300 });

		setTimeout(() => {
			// Hide feedback
			hideFeedback();

			setTimeout(() => {
				// Reset animated properties
				translateX.value = 0;
				opacity.value = 1;
			}, 100);
		}, 500);
	}
	//#endregion

	if (!show) return null;
	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.container, containerAnimatedStyle]}>
				<ThemedView
					shade={100}
					style={[
						styles.inner,
						{
							boxShadow: [
								{
									offsetX: 0,
									offsetY: 2,
									color: shadowColor,
									blurRadius: 4,
								},
							],
						},
						style,
					]}
					{...rest}
				>
					<ThemedView shade={800} style={styles.icon}>
						<Ionicons name={iconName} size={16} color={iconColor} />
					</ThemedView>

					<View style={styles.main}>
						<ThemedText fontFamily="Poppins_500Medium">{feedback?.message}</ThemedText>
						{feedback?.details && (
							<ThemedText shade={600} style={styles.details}>
								{feedback.details}
							</ThemedText>
						)}
					</View>

					<IconUnderlay style={styles.close} onPress={onClosePress}>
						<Ionicons name="close" size={12} color={closeIconColor} />
					</IconUnderlay>
				</ThemedView>
			</Animated.View>
		</GestureDetector>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 48,
		left: 16,
		right: 16,
		zIndex: 10,
	},
	inner: {
		width: Dimensions.get("screen").width - 32,
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
		borderRadius: BORDER_RADIUS[400],
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	icon: {
		borderRadius: BORDER_RADIUS[999],
		padding: 8,
	},
	main: {
		flex: 1,
		gap: 4,
	},
	details: {
		fontSize: FONT_SIZE[400],
	},
	close: {
		alignSelf: "flex-start",
		padding: 8,
	},
});

export default Feedback;
