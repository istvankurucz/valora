import { ColorShade, ColorVariant } from "@/src/constants/colors/colors";
import useThemeColor from "@/src/hooks/useThemeColor";
import { FontFamily } from "@/src/types/uiTypes";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
	fontFamily?: FontFamily;
	variant?: ColorVariant;
	shade?: ColorShade;
};

const ThemedText = ({
	fontFamily = "Poppins_400Regular",
	variant = "neutral",
	shade = 800,
	style,
	children,
	...rest
}: Props) => {
	// #region Hooks
	const color = useThemeColor({ variant, shade });
	//#endregion

	return (
		<Text style={[{ fontFamily, color }, style]} {...rest}>
			{children}
		</Text>
	);
};

export default ThemedText;
