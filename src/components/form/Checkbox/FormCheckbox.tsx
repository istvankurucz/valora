import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { Pressable, StyleSheet, View } from "react-native";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";
import Label from "../Label";
import Checkbox, { CheckboxProps } from "./Checkbox";

type Props = CheckboxProps & {
	field: string;
	label?: string;
};

const FormCheckbox = ({ variant, field, label, ...rest }: Props) => {
	// #region Hooks
	const { getErrorByField } = useFormValidation();
	//#endregion

	//#region Constants
	const error = getErrorByField(field);
	//#endregion

	//#region Functions
	function handlePress() {
		rest.onValueChange?.(!rest.value);
	}
	//#endregion

	return (
		<Pressable disabled={rest.disabled} onPress={handlePress}>
			<InputContainer>
				<View style={styles.main}>
					<Checkbox variant={error ? "danger" : variant} {...rest} />
					{label && (
						<Label error={error} fontFamily="Poppins_400Regular">
							{label}
						</Label>
					)}
				</View>

				<FieldError>{error?.message ?? ""}</FieldError>
			</InputContainer>
		</Pressable>
	);
};

// Styles
const styles = StyleSheet.create({
	main: {
		flexDirection: "row",
		gap: 8,
	},
});

export default FormCheckbox;
