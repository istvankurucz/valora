import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

const InputContainer = ({ style, children, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			{children}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
});

export default InputContainer;
