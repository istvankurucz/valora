import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../ui/ThemedView";

type Props = ViewProps & {
	hasTabBar?: boolean;
};

const Screen = ({ hasTabBar = true, style, children, ...rest }: Props) => {
	return (
		<SafeAreaView>
			<ThemedView
				style={[styles.container, hasTabBar ? { marginBottom: -16 } : undefined, style]}
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
		paddingHorizontal: 16,
	},
});

export default Screen;
