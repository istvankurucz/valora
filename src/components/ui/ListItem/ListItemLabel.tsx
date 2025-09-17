import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../ThemedText";

type Props = ThemedTextProps;

const ListItemLabel = ({ fontFamily, style, children, ...rest }: Props) => {
	return (
		<ThemedText
			fontFamily={fontFamily ?? "Poppins_600SemiBold"}
			style={[styles.label, style]}
			{...rest}
		>
			{children}
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	label: {
		fontSize: FONT_SIZE[600],
	},
});

export default ListItemLabel;
