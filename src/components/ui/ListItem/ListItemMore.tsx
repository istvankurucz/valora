import useThemeColor from "@/src/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
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
		<IconUnderlay style={[styles.underlay, { backgroundColor }, style]} {...rest}>
			{IconComponent ?? <Feather name="arrow-right" size={16} color={iconColor} />}
		</IconUnderlay>
	);
};

// Sytles
const styles = StyleSheet.create({
	underlay: {
		padding: 8,
	},
});

export default ListItemMore;
