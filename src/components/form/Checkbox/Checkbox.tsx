import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ColorVariant } from "@/src/constants/colors/colors";
import useInputColors from "@/src/hooks/useInputColors";
import useThemeColor from "@/src/hooks/useThemeColor";
import { Checkbox as ExpoCheckbox, CheckboxProps as ExpoCheckboxProps } from "expo-checkbox";
import { StyleSheet } from "react-native";

export type CheckboxProps = ExpoCheckboxProps & {
	variant?: ColorVariant;
};

const Checkbox = ({ variant = "neutral", color, hitSlop, style, ...rest }: CheckboxProps) => {
	//#region Hooks
	const backgroundColor = useThemeColor({ variant: "neutral", shade: 700 });
	const { borderColor } = useInputColors({ variant });
	//#endregion

	return (
		<ExpoCheckbox
			color={rest.value ? backgroundColor : undefined}
			hitSlop={hitSlop ?? 4}
			style={[
				styles.checkbox,
				{ borderColor: rest.value ? borderColor.focused : borderColor.default },
				style,
			]}
			{...rest}
		/>
	);
};

// Styles
const styles = StyleSheet.create({
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: BORDER_RADIUS[200],
	},
});

export default Checkbox;
