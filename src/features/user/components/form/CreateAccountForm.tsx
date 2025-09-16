import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { CREATE_ACCOUNT_FORM_DATA } from "../../constants/formData";
import useCreateAdminUser from "../../hooks/useCreateAdminUser";
import validateCreateAccountData from "../../utils/validation/validateCreateAccountData";

const CreateAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useFormData(CREATE_ACCOUNT_FORM_DATA);
	const { createAdminUser, loading } = useCreateAdminUser();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	//#region Functions
	async function handleCreateAccountPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { name } = validateCreateAccountData(data);

			// Create admin user
			await createAdminUser({ name });

			// Navigate
			router.replace("/");
		} catch (err) {
			addError(err);
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
				<FormCheckbox
					field="policy"
					label="I have read and agreed the policy."
					value={data.policy}
					onValueChange={(policy) => updateData({ policy })}
				/>
			</InputsContainer>

			<Button title="Create account" loading={loading} onPress={handleCreateAccountPress} />
		</View>
	);
};

export default CreateAccountForm;
