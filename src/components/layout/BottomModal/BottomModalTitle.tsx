import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../../ui/ThemedText";

type Props = ThemedTextProps;

const BottomModalTitle = ({ fontFamily, style, children, ...rest }: Props) => {
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
		fontSize: FONT_SIZE[700],
		marginBottom: 16,
	},
});

export default BottomModalTitle;
