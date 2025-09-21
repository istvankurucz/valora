import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import DateInput, { DateInputProps } from "./DateInput";

type Props = DateInputProps & {
	field: string;
	label?: string;
};

const FormDateInput = ({ field, label, variant, ...rest }: Props) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	return (
		<InputContainer>
			{label && <Label error={error}>{label}</Label>}
			<DateInput variant={error ? "danger" : variant} {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
};

export default FormDateInput;
