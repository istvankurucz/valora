import ThemedView, { ThemedViewProps } from "@/src/components/ui/ThemedView";
import { StyleSheet } from "react-native";

type Props = ThemedViewProps;

const ScreenHeaderPlaceholder = ({ style, ...rest }: Props) => {
	return <ThemedView style={[styles.container, style]} {...rest}></ThemedView>;
};

// Sytles
const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
	},
});

export default ScreenHeaderPlaceholder;
