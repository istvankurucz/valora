import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderIconUnderlayProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeaderIconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";

type Props = ScreenHeaderIconUnderlayProps;

const AccountHeaderNew = ({ underlayColor, style, ...rest }: Props) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 800 });
	const defaultUnderlayColor = useThemeColor({ variant: "neutral", shade: 900 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 100 });
	//#endregion

	return (
		<Link href="/accounts/new" style={{ backgroundColor }} asChild>
			<Screen.Header.IconUnderlay underlayColor={defaultUnderlayColor} style={style} {...rest}>
				<AntDesign name="plus" size={20} color={iconColor} />
			</Screen.Header.IconUnderlay>
		</Link>
	);
};

export default AccountHeaderNew;
