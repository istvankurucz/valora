import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

const ImportList = ({ style, children, ...rest }: Props) => {
	return (
		<View style={[styles.list, style]} {...rest}>
			{children}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	list: {
		gap: 8,
		marginLeft: 16,
	},
});

export default ImportList;
