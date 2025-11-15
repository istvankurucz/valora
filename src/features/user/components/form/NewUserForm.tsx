import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { NEW_USER_FORM_DATA } from "../../constants/formData";
import useCreateUser from "../../hooks/useCreateUser";
import validateNewUserData from "../../utils/validation/validateNewUserData";

const NewUserForm = () => {
	// #region Hooks
	const { data, updateData } = useFormData(NEW_USER_FORM_DATA);
	const { addError, removeErrors } = useFormValidation();
	const { createUser, loading } = useCreateUser();
	const { setError } = useError();
	const router = useRouter();
	//#endregion

	// #region Functions
	async function handleCreateUserPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validatiton
			const { name } = validateNewUserData(data);

			// Create user
			await createUser({ name, admin: false });

			// Navigate
			router.dismissTo("/settings/users");
		} catch (err) {
			addError(err);
			setError(err);
		}
	}
	//#endregion

	return (
		<View>
			<InputsContainer>
				<FormInput
					field="name"
					label="Name"
					placeholder="Name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
			</InputsContainer>

			<Button title="Create user" loading={loading} onPress={handleCreateUserPress} />
		</View>
	);
};

export default NewUserForm;
