import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import Underlay, { UnderlayProps } from "./Underlay";

export type IconUnderlayProps = UnderlayProps;

const IconUnderlay = ({ style, children, ...rest }: IconUnderlayProps) => {
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
