import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
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
		<InputContainer>
			{label && <Label error={error}>{label}</Label>}
			<Select variant={error ? "danger" : variant} {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
};

export default FormSelect;
