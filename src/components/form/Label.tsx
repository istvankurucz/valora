import { ValidationError } from "@/src/features/error/types/errorTypes";
import { StyleSheet } from "react-native";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";

export type LabelProps = ThemedTextProps & {
	error?: ValidationError;
};

const Label = ({ error, variant, shade, fontFamily, style, children, ...rest }: LabelProps) => {
	return (
		<ThemedText
			fontFamily={fontFamily ?? "Poppins_500Medium"}
			variant={error ? "danger" : undefined}
			shade={error ? 500 : undefined}
			style={styles.label}
			{...rest}
		>
			{children}
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	label: {
		marginBottom: -2,
	},
});

export default Label;
