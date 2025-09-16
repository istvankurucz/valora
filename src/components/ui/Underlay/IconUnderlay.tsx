import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import Underlay, { UnderlayProps } from "./Underlay";

type Props = UnderlayProps;

const IconUnderlay = ({ style, children, ...rest }: Props) => {
	return (
		<Underlay style={[styles.underlay, style]} {...rest}>
			{children}
		</Underlay>
	);
};

// Styles
const styles = StyleSheet.create({
	underlay: {
		borderRadius: BORDER_RADIUS[999],
		padding: 12,
	},
});

export default IconUnderlay;
