import { IconUnderlayProps } from "@/src/components/ui/Underlay/IconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import Screen from "../Screen";

type Props = IconUnderlayProps;

const ScreenHeaderOptions = (props: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<Screen.Header.IconUnderlay {...props}>
			<Ionicons name="ellipsis-horizontal" size={20} color={iconColor} />
		</Screen.Header.IconUnderlay>
	);
};

export default ScreenHeaderOptions;
