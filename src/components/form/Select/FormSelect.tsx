import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { StyleSheet, View } from "react-native";
import FieldError from "../FieldError";
import Label from "../Label";
import Select, { SelectProps } from "./Select";

type Props<T> = SelectProps<T> & {
	field: string;
	label?: string;
};

const FormSelect = <T,>({ field, label, variant, ...rest }: Props<T>) => {
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
			<Select variant={error ? "danger" : variant} {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
	label: {
		marginBottom: -2,
	},
});

export default FormSelect;
