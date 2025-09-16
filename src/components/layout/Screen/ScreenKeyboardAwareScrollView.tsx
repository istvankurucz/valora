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
		paddingBottom: 32,
	},
});

export default ScreenKeyboardAwareScrollView;
