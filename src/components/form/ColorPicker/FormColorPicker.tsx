import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { ViewStyle } from "react-native";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";

type Props = ColorPickerProps & {
	field: string;
	label?: string;
	containerStyle?: ViewStyle;
};

const FormColorPicker = ({ field, label, containerStyle, ...rest }: Props) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	return (
		<InputContainer style={containerStyle}>
			{label && <Label error={error}>{label}</Label>}
			<ColorPicker {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
};

export default FormColorPicker;
