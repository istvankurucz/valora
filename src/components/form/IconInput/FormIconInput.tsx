import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import IconInput, { IconInputProps } from "./IconInput";

type Props = IconInputProps & {
	field: string;
	label?: string;
};

const FormIconInput = ({ field, label, ...rest }: Props) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	return (
		<InputContainer>
			{label && <Label error={error}>{label}</Label>}
			<IconInput {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
};

export default FormIconInput;
