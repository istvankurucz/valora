import { ValidationError } from "@/src/features/error/types/errorTypes";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";

export type LabelProps = ThemedTextProps & {
	error?: ValidationError;
};

const Label = ({ error, variant, shade, fontFamily, children, ...rest }: LabelProps) => {
	return (
		<ThemedText
			fontFamily={fontFamily ?? "Poppins_500Medium"}
			variant={error ? "danger" : undefined}
			shade={error ? 500 : undefined}
			{...rest}
		>
			{children}
		</ThemedText>
	);
};

export default Label;
