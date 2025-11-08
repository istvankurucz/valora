import Divider from "@/src/components/ui/Divider";
import ThemedText from "@/src/components/ui/ThemedText";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	text: string;
};

const ImportListItem = ({ text, style, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			<Divider shade={800} />
			<ThemedText>{text}</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
});

export default ImportListItem;
