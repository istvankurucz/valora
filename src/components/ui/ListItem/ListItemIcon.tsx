import { StyleSheet } from "react-native";
import IconBox, { IconBoxProps } from "../IconBox";

type Props = IconBoxProps;

const ListItemIcon = ({ style, ...rest }: Props) => {
	return <IconBox style={[styles.icon, style]} {...rest} />;
};

// Sytles
const styles = StyleSheet.create({
	icon: {
		alignSelf: "center",
	},
});

export default ListItemIcon;
