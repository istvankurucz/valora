import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import SegmentedControl, { SegmentedControlProps } from "./SegmentedControl";

type Props<T> = SegmentedControlProps<T> & {
	field: string;
	label?: string;
};

const FormSegmentedControl = <T,>({ field, label, style, ...rest }: Props<T>) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	return (
		<InputContainer>
			{label && <Label error={error}>{label}</Label>}
			<SegmentedControl {...rest} />
			<FieldError>{error?.message ?? ""}</FieldError>
		</InputContainer>
	);
};

export default FormSegmentedControl;
