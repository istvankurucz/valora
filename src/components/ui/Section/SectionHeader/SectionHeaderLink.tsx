import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../../ThemedText";

type Props = ThemedTextProps;

const SectionHeaderLink = ({ variant = "info", shade = 600, style, children, ...rest }: Props) => {
	return (
		<ThemedText variant={variant} shade={500} style={[styles.link, style]} {...rest}>
			{children}
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	link: {
		textDecorationLine: "underline",
	},
});

export default SectionHeaderLink;
