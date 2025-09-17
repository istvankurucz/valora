import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { Fragment, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import ReanimatedColorPicker, {
	ColorFormatsObject,
	HueSlider,
	OpacitySlider,
	Panel1,
	Preview,
	ColorPickerProps as ReanimatedColorPickerProps,
} from "reanimated-color-picker";
import ThemedView from "../../ui/ThemedView";

export type ColorPickerProps = ReanimatedColorPickerProps & {
	onChangeHex?: (hex: string) => void;
};

const ColorPicker = ({ onChangeJS, onChangeHex, ...rest }: ColorPickerProps) => {
	//#region States
	const [showColorPicker, setShowColorPicker] = useState(false);
	//#endregion

	//#region Functions
	function handleOpenPress() {
		setShowColorPicker(true);
	}

	function handleColorChange({ hex }: ColorFormatsObject) {
		// Run event handler
		onChangeHex?.(hex);
	}

	function handleRequestClose() {
		setShowColorPicker(false);
	}
	//#endregion

	return (
		<Fragment>
			<Pressable hitSlop={4} onPress={handleOpenPress}>
				<View style={[styles.value, { backgroundColor: rest.value }]}></View>
			</Pressable>

			<Modal visible={showColorPicker} transparent onRequestClose={handleRequestClose}>
				<ThemedView style={styles.modal}>
					<ReanimatedColorPicker onChangeJS={handleColorChange} {...rest}>
						<Preview />
						<Panel1 />
						<HueSlider />
						<OpacitySlider />
					</ReanimatedColorPicker>
				</ThemedView>
			</Modal>
		</Fragment>
	);
};

// Styles
const styles = StyleSheet.create({
	value: {
		width: 32,
		height: 32,
		borderRadius: BORDER_RADIUS[400],
	},
	modal: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "transparent",
		marginHorizontal: 24,
		marginVertical: 48,
	},
});

export default ColorPicker;
