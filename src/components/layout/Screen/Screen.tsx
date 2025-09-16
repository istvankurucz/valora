import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../ui/ThemedView";
import ScreenKeyboardAwareScrollView from "./ScreenKeyboardAwareScrollView";
import ScreenScrollView from "./ScreenScrollView";

type Props = ViewProps & {
	hasTabBar?: boolean;
};

const Screen = ({ hasTabBar = true, style, children, ...rest }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ThemedView
				style={[styles.inner, hasTabBar ? { marginBottom: -16 } : undefined, style]}
				{...rest}
			>
				{children}
			</ThemedView>
		</SafeAreaView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		flex: 1,
		// backgroundColor: "red",
		paddingHorizontal: 16,
		// paddingBottom: 32,
	},
});

// Childre
Screen.ScrollView = ScreenScrollView;
Screen.KeyboardAwareScrollView = ScreenKeyboardAwareScrollView;

export default Screen;
