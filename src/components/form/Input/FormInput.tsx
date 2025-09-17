import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { forwardRef } from "react";
import { TextInput } from "react-native";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import Input, { InputProps } from "./Input";

type Props = InputProps & {
	field: string;
	label?: string;
};

const FormInput = forwardRef<TextInput, Props>(({ field, label, variant, style, ...rest }, ref) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	return (
		<InputContainer>
			{label && <Label error={error}>{label}</Label>}
			<Input variant={error ? "danger" : variant} {...rest} ref={ref} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
});

// Display name
FormInput.displayName = "FormInput";

export default FormInput;
