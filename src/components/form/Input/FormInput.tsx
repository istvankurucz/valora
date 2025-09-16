import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import FieldError from "../FieldError";
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
		<View style={styles.container}>
			{label && (
				<Label error={error} style={styles.label}>
					{label}
				</Label>
			)}
			<Input variant={error ? "danger" : variant} {...rest} ref={ref} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</View>
	);
});

// Display name
FormInput.displayName = "FormInput";

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
	label: {
		marginBottom: -2,
	},
});

export default FormInput;
