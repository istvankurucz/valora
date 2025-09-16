import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

type Props = ScrollViewProps;

const ScreenScrollView = ({ contentContainerStyle, children, ...rest }: Props) => {
	return (
		<ScrollView contentContainerStyle={[styles.container, contentContainerStyle]} {...rest}>
			{children}
		</ScrollView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingBottom: 32,
	},
});

export default ScreenScrollView;
