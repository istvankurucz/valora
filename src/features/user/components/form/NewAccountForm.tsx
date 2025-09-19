import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { CURRENCIES } from "@/src/constants/currencies";
import { DEFAULT_ACCOUNT_DATA } from "@/src/features/account/constants/defaultAccountData";
import useCreateAccount from "@/src/features/account/hooks/useCreateAccount";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import { DEFAULT_TRANSACTION_CATEGORIES } from "@/src/features/transactionCategory/constants/defaultTransactionCategories";
import useCreateTransactionCategory from "@/src/features/transactionCategory/hooks/useCreateTransactionCategory";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { NEW_ACCOUNT_FORM_DATA } from "../../constants/formData";
import useCreateAdminUser from "../../hooks/useCreateAdminUser";
import validateNewAccountData from "../../utils/validation/validateNewAccountData";

const NewAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useFormData(NEW_ACCOUNT_FORM_DATA);
	const { createAdminUser, loading: loadingCreateAdmin } = useCreateAdminUser();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { createAccount, loading: loadingCreateAccount } = useCreateAccount();
	const { createTransactionCategory, loading: loadingCreateTransactionCategories } =
		useCreateTransactionCategory();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const currencyOptions = useMemo(
		() =>
			CURRENCIES.map((currency) => ({
				value: currency.code,
				label: <ThemedText>{currency.code}</ThemedText>,
			})),
		[]
	);

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
			const { name, currency } = validateNewAccountData(data);

			// Create admin user
			await createAdminUser({ name, currency });

			// Create default account
			const icon = await createIcon(DEFAULT_ACCOUNT_DATA.icon);
			await createAccount({ name: DEFAULT_ACCOUNT_DATA.name, default: true, iconId: icon.id });

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
			<InputsContainer type="normal">
				<FormInput
					field="name"
					label="Name"
					placeholder="Name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
				<FormSelect
					field="currency"
					label="Curency"
					options={currencyOptions}
					value={data.currency}
					onValueChange={(currency) => updateData({ currency })}
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

export default NewAccountForm;
