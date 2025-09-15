import ThemedText from "@/src/components/ui/ThemedText";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import { useRouter } from "expo-router";
import { Button, TextInput, View } from "react-native";
import { CREATE_ACCOUNT_FORM_DATA } from "../../constants/formData";
import useCreateAdminUser from "../../hooks/useCreateAdminUser";
import validateCreateAccountData from "../../utils/validation/validateCreateAccountData";

const CreateAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useFormData(CREATE_ACCOUNT_FORM_DATA);
	const { createAdminUser, loading } = useCreateAdminUser();
	const { addError, removeErrors, getErrorByField } = useFormValidation();
	const router = useRouter();
	//#endregion

	//#region Constants
	const error = getErrorByField("name");
	//#endregion

	//#region Functions
	async function handleCreateAccountPress() {
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
			<View>
				<ThemedText>Name</ThemedText>
				<TextInput
					placeholder="Name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
				<ThemedText variant="danger" shade={500}>
					{error?.message ?? ""}
				</ThemedText>
			</View>

			<Button
				title={loading ? "Loading..." : "Create account"}
				onPress={handleCreateAccountPress}
			/>
		</View>
	);
};

export default CreateAccountForm;
