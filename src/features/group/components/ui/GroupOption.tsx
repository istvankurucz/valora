import IconBox from "@/src/components/ui/IconBox";
import ThemedText from "@/src/components/ui/ThemedText";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { StyleSheet, View, ViewProps } from "react-native";
import { Group } from "../../types/groupTypes";

type Props = ViewProps & {
	group: Group;
};

const GroupOption = ({ group, style, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			<IconBox icon={{ ...group.icon, size: 20 }} style={styles.iconBox} />
			<ThemedText>{capitalizeString(group.name)}</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
	},
	iconBox: {
		width: 48,
		height: 48,
	},
});

export default GroupOption;
