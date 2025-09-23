import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../ui/ThemedView";
import ScreenContainer from "./ScreenContainer";
import ScreenHeader from "./ScreenHeader/ScreenHeader";
import ScreenKeyboardAwareScrollView from "./ScreenKeyboardAwareScrollView";
import ScreenScrollView from "./ScreenScrollView";

type Props = ViewProps & {
	hasHeader?: boolean;
	hasTabBar?: boolean;
};

const Screen = ({ hasHeader = true, hasTabBar = true, style, children, ...rest }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ThemedView
				style={[
					styles.inner,
					hasHeader ? { marginTop: -34, paddingTop: 0 } : undefined,
					hasTabBar ? { marginBottom: -16 } : undefined,
					style,
				]}
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
		paddingHorizontal: 16,
	},
});

// Childre
Screen.Header = ScreenHeader;
Screen.ScrollView = ScreenScrollView;
Screen.KeyboardAwareScrollView = ScreenKeyboardAwareScrollView;
Screen.Container = ScreenContainer;

export default Screen;
