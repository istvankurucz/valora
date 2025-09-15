import { useColorScheme } from "react-native";
import { COLORS, ColorShade, ColorVariant } from "../constants/colors/colors";

type Props = {
	variant: ColorVariant;
	shade: ColorShade;
};

const useThemeColor = ({ variant, shade }: Props) => {
	//#region Hooks
	const theme = useColorScheme() ?? "light";
	//#endregion

	return COLORS[theme][variant][shade];
};

export default useThemeColor;
