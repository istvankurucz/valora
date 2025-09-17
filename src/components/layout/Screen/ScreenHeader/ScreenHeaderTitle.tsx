import ThemedText, { ThemedTextProps } from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";

type Props = ThemedTextProps;

const ScreenHeaderTitle = ({ fontFamily, numberOfLines, style, children, ...rest }: Props) => {
	return (
		<ThemedText
			fontFamily={fontFamily ?? "Poppins_600SemiBold"}
			numberOfLines={numberOfLines ?? 1}
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
		height: 40,
		verticalAlign: "middle",
		flex: 1,
		fontSize: FONT_SIZE[600],
		textAlign: "center",
	},
});

export default ScreenHeaderTitle;
