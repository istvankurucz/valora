import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../ThemedText";

type Props = ThemedTextProps;

const SectionTitle = ({ fontFamily, style, children, ...rest }: Props) => {
	return (
		<ThemedText
			fontFamily={fontFamily ?? "Poppins_600SemiBold"}
			style={[styles.title, style]}
			{...rest}
		>
			{children}
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	title: {
		marginBottom: 8,
	},
});

export default SectionTitle;
