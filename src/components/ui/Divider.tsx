import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import ThemedView, { ThemedViewProps } from "./ThemedView";

type Props = ThemedViewProps;

const Divider = ({ shade = 500, style, ...rest }: Props) => {
	return <ThemedView shade={shade} style={[styles.divider, style]} {...rest}></ThemedView>;
};

// Sytles
const styles = StyleSheet.create({
	divider: {
		width: 4,
		height: 4,
		borderRadius: BORDER_RADIUS[999],
		marginBottom: 4,
	},
});

export default Divider;
