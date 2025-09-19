import { StyleSheet } from "react-native";
import {
	KeyboardAwareScrollView,
	KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";

type Props = KeyboardAwareScrollViewProps;

const ScreenKeyboardAwareScrollView = ({
	keyboardShouldPersistTaps,
	contentContainerStyle,
	children,
	...rest
}: Props) => {
	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? "handled"}
			bottomOffset={48}
			contentContainerStyle={[styles.container, contentContainerStyle]}
			{...rest}
		>
			{children}
		</KeyboardAwareScrollView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		paddingBottom: 32,
	},
});

export default ScreenKeyboardAwareScrollView;
