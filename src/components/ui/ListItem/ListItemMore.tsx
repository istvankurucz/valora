import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import IconUnderlay, { IconUnderlayProps } from "../Underlay/IconUnderlay";

type Props = IconUnderlayProps & {
	iconName?: string;
};

const ListItemMore = ({ iconName, style, ...rest }: Props) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<IconUnderlay style={[styles.underlay, { backgroundColor }, style]} {...rest}>
			<Ionicons name={(iconName as any) ?? "arrow-forward"} size={14} color={iconColor} />
		</IconUnderlay>
	);
};

// Styles
const styles = StyleSheet.create({
	underlay: {
		padding: 8,
	},
});

export default ListItemMore;
