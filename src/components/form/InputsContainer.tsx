import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import ThemedView, { ThemedViewProps } from "../ui/ThemedView";

export type InputsContainerProps = ThemedViewProps & {
	type?: "normal" | "section";
};

const InputsContainer = ({
	type = "section",
	shade,
	style,
	children,
	...rest
}: InputsContainerProps) => {
	return (
		<ThemedView
			shade={shade ?? type === "section" ? 100 : undefined}
			style={[styles.container, type === "section" ? styles.section : undefined, style]}
			{...rest}
		>
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
	section: {
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
	},
});

export default InputsContainer;
