import { StyleSheet } from "react-native";
import ThemedView, { ThemedViewProps } from "../ui/ThemedView";

type Props = ThemedViewProps;

const ListContainer = ({ style, children, ...rest }: Props) => {
	return (
		<ThemedView style={[styles.container, style]} {...rest}>
			{children}
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
});

export default ListContainer;
