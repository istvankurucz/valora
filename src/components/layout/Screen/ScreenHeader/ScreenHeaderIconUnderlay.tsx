import IconUnderlay, { IconUnderlayProps } from "@/src/components/ui/Underlay/IconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export type ScreenHeaderIconUnderlayProps = IconUnderlayProps;

const ScreenHeaderIconUnderlay = ({ style, children, ...rest }: ScreenHeaderIconUnderlayProps) => {
	// #region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
	//#endregion

	return (
		<IconUnderlay style={[styles.underlay, { backgroundColor }, style]} {...rest}>
			{children}
		</IconUnderlay>
	);
};

// Styles
const styles = StyleSheet.create({
	underlay: {
		padding: 10,
	},
});

export default ScreenHeaderIconUnderlay;
