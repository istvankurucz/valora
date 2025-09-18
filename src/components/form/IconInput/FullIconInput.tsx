import { StyleSheet, View, ViewProps } from "react-native";
import FormColorPicker from "../ColorPicker/FormColorPicker";
import InputsContainer from "../InputsContainer";
import FormIconInput from "./FormIconInput";

type Props = ViewProps & {
	icon?: string;
	onIconChange?: (newIcon: string) => void;
	foregroundColor?: string;
	onForegroundColorChange?: (newColor: string) => void;
	backgroundColor?: string;
	onBackgroundColorChange?: (newColor: string) => void;
};

const FullIconInput = ({
	icon,
	onIconChange,
	foregroundColor,
	onForegroundColorChange,
	backgroundColor,
	onBackgroundColorChange,
	style,
	...rest
}: Props) => {
	return (
		<InputsContainer style={[styles.container, style]} {...rest}>
			<FormIconInput
				field="icon"
				label="Icon"
				value={icon}
				onIconChange={onIconChange}
				iconColor={foregroundColor}
				backgroundColor={backgroundColor}
			/>
			<View style={styles.colors}>
				<FormColorPicker
					field="foregroundColor"
					label="Icon color"
					containerStyle={styles.color}
					value={foregroundColor}
					onChangeHex={onForegroundColorChange}
				/>
				<FormColorPicker
					field="backgroundColor"
					label="Background color"
					containerStyle={styles.color}
					value={backgroundColor}
					onChangeHex={onBackgroundColorChange}
				/>
			</View>
		</InputsContainer>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		marginBottom: 0,
	},
	colors: {
		flexDirection: "row",
		gap: 16,
		justifyContent: "space-between",
	},
	color: {
		width: "45%",
		alignItems: "center",
	},
});

export default FullIconInput;
