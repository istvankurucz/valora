import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import ThemedView from "../ThemedView";
import Underlay, { UnderlayProps } from "../Underlay/Underlay";
import ListItemIcon from "./ListItemIcon";
import ListItemInfo from "./ListItemInfo";
import ListItemLabel from "./ListItemLabel";
import ListItemMain from "./ListItemMain";
import ListItemMore from "./ListItemMore";

export type ListItemProps = UnderlayProps;

const ListItem = ({ underlayColor, style, children, ...rest }: ListItemProps) => {
	// #region Hooks
	const defaultUnderlayColor = useThemeColor({ variant: "neutral", shade: 300 });
	//#endregion

	return (
		<Underlay
			underlayColor={underlayColor ?? defaultUnderlayColor}
			style={styles.container}
			{...rest}
		>
			<ThemedView shade={100} style={[styles.inner, style]}>
				{children}
			</ThemedView>
		</Underlay>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS[500],
		overflow: "hidden",
	},
	inner: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
		padding: 8,
	},
});

// Children
ListItem.Icon = ListItemIcon;
ListItem.Main = ListItemMain;
ListItem.Label = ListItemLabel;
ListItem.Info = ListItemInfo;
ListItem.More = ListItemMore;

export default ListItem;
