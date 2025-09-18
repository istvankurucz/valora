import { StyleSheet, View, ViewStyle } from "react-native";
import Underlay, { UnderlayProps } from "../../ui/Underlay/Underlay";

type Props = UnderlayProps & {
	innerStyle?: ViewStyle;
};

const BottomModalListItem = ({ innerStyle, style, children, ...rest }: Props) => {
	return (
		<Underlay style={[styles.underlay, style]} {...rest}>
			<View style={[styles.inner, innerStyle]}>{children}</View>
		</Underlay>
	);
};

// Styles
const styles = StyleSheet.create({
	underlay: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		marginHorizontal: -16,
	},
	inner: {
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
	},
});

export default BottomModalListItem;
