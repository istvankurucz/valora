import { ColorShade, ColorVariant } from "@/src/constants/colors/colors";
import useThemeColor from "@/src/hooks/useThemeColor";
import { View, ViewProps } from "react-native";

type Props = ViewProps & {
	variant?: ColorVariant;
	shade?: ColorShade;
};

const ThemedView = ({ variant = "neutral", shade = 200, style, children, ...rest }: Props) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant, shade });
	//#endregion

	return (
		<View style={[{ backgroundColor }, style]} {...rest}>
			{children}
		</View>
	);
};

export default ThemedView;
