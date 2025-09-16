import { StyleSheet } from "react-native";
import ThemedView, { ThemedViewProps } from "../ui/ThemedView";

type Props = ThemedViewProps;

const InputsContainer = ({ style, children, ...rest }: Props) => {
	return (
		<ThemedView style={[styles.container, style]} {...rest}>
			{children}
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 4,
		marginBottom: 24,
	},
});

export default InputsContainer;
