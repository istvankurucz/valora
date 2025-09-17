import useThemeColor from "@/src/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";
import IconUnderlay, { IconUnderlayProps } from "../Underlay/IconUnderlay";

type Props = IconUnderlayProps & {
	IconComponent?: ReactNode;
};

const ListItemMore = ({ IconComponent, style, ...rest }: Props) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<IconUnderlay style={[{ backgroundColor }, style]} {...rest}>
			{IconComponent ?? <Feather name="arrow-right" size={20} color={iconColor} />}
		</IconUnderlay>
	);
};

export default ListItemMore;
