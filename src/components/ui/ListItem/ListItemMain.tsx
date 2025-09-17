import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps;

const ListItemMain = ({ style, children, ...rest }: Props) => {
	return (
		<View style={[styles.main, style]} {...rest}>
			{children}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	main: {
		flex: 1,
		gap: 2,
	},
});

export default ListItemMain;
