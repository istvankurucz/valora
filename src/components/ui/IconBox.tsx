import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { Icon } from "@/src/features/icon/types/iconTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ViewProps } from "react-native";

export type IconBoxProps = ViewProps & {
	icon: Icon & { size?: number };
};

const IconBox = ({ icon, style, ...rest }: IconBoxProps) => {
	return (
		<View style={[styles.box, { backgroundColor: icon.backgroundColor }, style]} {...rest}>
			<Ionicons name={icon.name as any} size={icon.size ?? 32} color={icon.foregroundColor} />
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	box: {
		alignSelf: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
	},
});

export default IconBox;
