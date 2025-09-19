import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FullIconInput from "@/src/components/form/IconInput/FullIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import formatHexColor from "@/src/utils/color/formatHexColor";
import { useRouter } from "expo-router";
import { useNewAccount } from "../../contexts/NewAccountContext";
import useCreateAccount from "../../hooks/useCreateAccount";
import useUnsetDefaultAccount from "../../hooks/useUnsetDefaultAccount";
import validateNewAccountData from "../../utils/validation/validateNewAccountData";

const NewAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useNewAccount();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { unsetDefaultAccount, loading: loadingUnsetDefaultAccount } = useUnsetDefaultAccount();
	const { createAccount, loading: loadingCreateAccount } = useCreateAccount();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingCreateIcon || loadingUnsetDefaultAccount || loadingCreateAccount;
	//#endregion

	// #region Functions
	async function handleCreateAccountPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validation
			const {
				name,
				icon,
				foregroundColor,
				backgroundColor,
				default: defaultAccount,
			} = validateNewAccountData({
				name: data.name,
				icon: data.icon,
				foregroundColor: formatHexColor(data.foregroundColor),
				backgroundColor: formatHexColor(data.backgroundColor),
				default: data.default,
			});

			// Create account
			const createdIcon = await createIcon({ name: icon, foregroundColor, backgroundColor });
			if (defaultAccount) await unsetDefaultAccount();
			const account = await createAccount({
				name,
				iconId: createdIcon.id,
				default: defaultAccount,
			});

			// Navigate
			router.dismissTo(`/accounts/${account.id}`);
		} catch (err) {
			console.log(err);
			addError(err);
		}
	}
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Account data</Section.Title>

			<InputsContainer>
				<FullIconInput
					icon={data.icon}
					onIconChange={(icon) => updateData({ icon })}
					foregroundColor={data.foregroundColor}
					onForegroundColorChange={(foregroundColor) => updateData({ foregroundColor })}
					backgroundColor={data.backgroundColor}
					onBackgroundColorChange={(backgroundColor) => updateData({ backgroundColor })}
				/>
				<FormInput
					field="name"
					label="Account name"
					placeholder="Account name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
				<FormCheckbox
					field="default"
					label="Set as default account"
					value={data.default}
					onValueChange={(checked) => updateData({ default: checked })}
				/>
			</InputsContainer>

			<Button title="Create account" loading={loading} onPress={handleCreateAccountPress} />
		</ThemedView>
	);
};

export default NewAccountForm;
