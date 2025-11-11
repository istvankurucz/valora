import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { CURRENCIES } from "@/src/constants/currencies";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { useMemo } from "react";
import { View } from "react-native";
import { useAdminUser } from "../../contexts/AdminUserContext";
import useEditAccountFormData from "../../hooks/useEditAccountFormData";
import useUpdateAdminPreferences from "../../hooks/useUpdateAdminPreferences";
import useUpdateUser from "../../hooks/useUpdateUser";
import validateEditAccountData from "../../utils/validation/validateEditAccountData";

const EditAccountForm = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { data, updateData } = useEditAccountFormData();
	const { updateUser, loading: loadingUser } = useUpdateUser();
	const { updateAdminPreferences, loading: loadingAdminPreferences } = useUpdateAdminPreferences();
	const { addError, removeErrors } = useFormValidation();
	const { setFeedback } = useFeedback();
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

	const loading = loadingUser || loadingAdminPreferences;
	//#endregion

	// #region Functions
	async function handleUpdateAccountPress() {
		// Check admin
		if (!admin) return;

		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { name, currency } = validateEditAccountData(data);

			// Create admin user
			await updateUser({ id: admin.id, data: { name } });
			await updateAdminPreferences({ currency });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Data saved.",
			});
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
				<FormSelect
					field="currency"
					label="Curency"
					options={currencyOptions}
					value={data.currency}
					onValueChange={(currency) => updateData({ currency })}
				/>
			</InputsContainer>

			<Button title="Update account" loading={loading} onPress={handleUpdateAccountPress} />
		</View>
	);
};

export default EditAccountForm;
