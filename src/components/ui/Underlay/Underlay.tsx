import useThemeColor from "@/src/hooks/useThemeColor";
import { TouchableHighlight, TouchableHighlightProps } from "react-native";

export type UnderlayProps = TouchableHighlightProps;

const Underlay = ({ underlayColor, style, onPress, children, ...rest }: UnderlayProps) => {
	// #region Hooks
	const defaultUnderlayColor = useThemeColor({ variant: "neutral", shade: 400 });
	//#endregion

	// #region Functions
	function defaultUnderlayFunction() {}
	//#endregion

	return (
		<TouchableHighlight
			underlayColor={underlayColor ?? defaultUnderlayColor}
			style={[rest.disabled ? { opacity: 0.5 } : undefined, style]}
			onPress={onPress ?? defaultUnderlayFunction}
			{...rest}
		>
			{children}
		</TouchableHighlight>
	);
};

export default Underlay;
