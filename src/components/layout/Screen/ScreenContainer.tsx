import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

const ScreenContainer = ({ style, children, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			{children}
		</View>
	);
};

// Style
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default ScreenContainer;
