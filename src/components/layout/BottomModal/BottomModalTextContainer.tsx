import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

const BottomModalTextContainer = ({ style, children, ...rest }: Props) => {
	return (
		<View style={[styles.body, style]} {...rest}>
			{children}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	body: {
		gap: 4,
		marginBottom: 24,
	},
});

export default BottomModalTextContainer;
