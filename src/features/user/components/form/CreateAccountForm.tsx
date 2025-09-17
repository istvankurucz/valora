import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import { DEFAULT_ACCOUNT_DATA } from "@/src/features/account/constants/defaultAccountData";
import useCreateAccount from "@/src/features/account/hooks/useCreateAccount";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import { DEFAULT_TRANSACTION_CATEGORIES } from "@/src/features/transactionCategory/constants/defaultTransactionCategories";
import useCreateTransactionCategory from "@/src/features/transactionCategory/hooks/useCreateTransactionCategory";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { CREATE_ACCOUNT_FORM_DATA } from "../../constants/formData";
import useCreateAdminUser from "../../hooks/useCreateAdminUser";
import validateCreateAccountData from "../../utils/validation/validateCreateAccountData";

const CreateAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useFormData(CREATE_ACCOUNT_FORM_DATA);
	const { createAdminUser, loading: loadingCreateAdmin } = useCreateAdminUser();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { createAccount, loading: loadingCreateAccount } = useCreateAccount();
	const { createTransactionCategory, loading: loadingCreateTransactionCategories } =
		useCreateTransactionCategory();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading =
		loadingCreateAdmin ||
		loadingCreateIcon ||
		loadingCreateAccount ||
		loadingCreateTransactionCategories;
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

			// Create default account
			const icon = await createIcon(DEFAULT_ACCOUNT_DATA.icon);
			await createAccount({ name: DEFAULT_ACCOUNT_DATA.name, iconId: icon.id });

			// Create default transaction categories
			DEFAULT_TRANSACTION_CATEGORIES.forEach(async (category) => {
				// Create transaction icon
				const icon = await createIcon(category.icon);

				// Create transaction category
				await createTransactionCategory({
					type: category.type,
					name: category.name,
					iconId: icon.id,
				});
			});

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
