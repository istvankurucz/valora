import useThemeColor from "@/src/hooks/useThemeColor";
import AntDesign from "@expo/vector-icons/AntDesign";
import Screen from "../Screen";
import { ScreenHeaderIconUnderlayProps } from "./ScreenHeaderIconUnderlay";

type Props = ScreenHeaderIconUnderlayProps;

const ScreenHeaderNew = ({ underlayColor, style, ...rest }: Props) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 800 });
	const defaultUnderlayColor = useThemeColor({ variant: "neutral", shade: 900 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 100 });
	//#endregion

	return (
		<Screen.Header.IconUnderlay
			underlayColor={defaultUnderlayColor}
			style={[{ backgroundColor }, style]}
			{...rest}
		>
			<AntDesign name="plus" size={20} color={iconColor} />
		</Screen.Header.IconUnderlay>
	);
};

export default ScreenHeaderNew;
