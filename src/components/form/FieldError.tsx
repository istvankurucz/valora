import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";

type Props = ThemedTextProps;

const FieldError = ({ variant, shade, style, children, ...rest }: Props) => {
	return (
		<ThemedText
			variant={variant ?? "danger"}
			shade={shade ?? 500}
			style={[styles.text, style]}
			{...rest}
		>
			{children}
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	text: {
		fontSize: FONT_SIZE[400],
	},
});

export default FieldError;
