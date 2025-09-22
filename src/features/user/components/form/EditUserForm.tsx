import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { useLastPathname } from "@/src/features/navigation/contexts/LastPathnameContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useUser } from "../../contexts/UserContext";
import useEditUserData from "../../hooks/useEditUserData";
import useUpdateUser from "../../hooks/useUpdateUser";
import validateEditUserData from "../../utils/validation/validateEditUserData";

const EditUserForm = () => {
	// #region Hooks
	const { user } = useUser();
	const { data, updateData } = useEditUserData();
	const { addError, removeErrors } = useFormValidation();
	const { updateUser, loading } = useUpdateUser();
	const { setError } = useError();
	const { pathname } = useLastPathname();
	const router = useRouter();
	//#endregion

	// #region Functions
	async function handleCreateUserPress() {
		// Check user
		if (!user) return;

		// Remove form errors
		removeErrors();

		try {
			// Validatiton
			const { name } = validateEditUserData(data);

			// Create user
			await updateUser({ id: user.id, data: { name } });

			// Navigate
			router.replace(pathname as any);
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

			<Button title="Update user" loading={loading} onPress={handleCreateUserPress} />
		</View>
	);
};

export default EditUserForm;
