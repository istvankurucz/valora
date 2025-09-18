import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FormColorPicker from "@/src/components/form/ColorPicker/FormColorPicker";
import FormIconInput from "@/src/components/form/IconInput/FormIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useUpdateIcon from "@/src/features/icon/hooks/useUpdateIcon";
import formatHexColor from "@/src/utils/color/formatHexColor";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useAccount } from "../../contexts/AccountContext";
import { useEditAccount } from "../../contexts/EditAccountContext";
import useUnsetDefaultAccount from "../../hooks/useUnsetDefaultAccount";
import useUpdateAccount from "../../hooks/useUpdateAccount";
import validateEditAccountData from "../../utils/validation/validateEditAccountData";

const EditAccountForm = () => {
	// #region Hooks
	const { account } = useAccount();
	const { data, updateData } = useEditAccount();
	const { updateIcon, loading: loadingUpdateIcon } = useUpdateIcon();
	const { unsetDefaultAccount, loading: loadingUnsetDefaultAccount } = useUnsetDefaultAccount();
	const { updateAccount, loading: loadingUpdateAccount } = useUpdateAccount();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingUpdateIcon || loadingUnsetDefaultAccount || loadingUpdateAccount;
	//#endregion

	// #region Functions
	async function handleUpdateAccountPress() {
		// Check account
		if (!account) return;

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
			} = validateEditAccountData({
				name: data.name,
				icon: data.icon,
				foregroundColor: formatHexColor(data.foregroundColor),
				backgroundColor: formatHexColor(data.backgroundColor),
				default: data.default,
			});

			// Update account
			if (defaultAccount) await unsetDefaultAccount();
			await updateIcon({
				id: account.icon.id,
				data: { name: icon, foregroundColor, backgroundColor },
			});
			await updateAccount({
				id: account.id,
				data: {
					name,
					default: defaultAccount,
				},
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
			<SectionTitle>Account data</SectionTitle>

			<InputsContainer shade={100} style={styles.inputs}>
				<FormIconInput
					field="icon"
					label="Icon"
					value={data.icon}
					onIconChange={(icon) => updateData({ icon })}
					iconColor={data.foregroundColor}
					backgroundColor={data.backgroundColor}
				/>
				<View style={styles.colors}>
					<FormColorPicker
						field="foregroundColor"
						label="Icon color"
						containerStyle={styles.color}
						value={data.foregroundColor}
						onChangeHex={(foregroundColor) => updateData({ foregroundColor })}
					/>
					<FormColorPicker
						field="backgroundColor"
						label="Background color"
						containerStyle={styles.color}
						value={data.backgroundColor}
						onChangeHex={(backgroundColor) => updateData({ backgroundColor })}
					/>
				</View>
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
					disabled={account?.default}
					value={data.default}
					onValueChange={(checked) => updateData({ default: checked })}
				/>
			</InputsContainer>

			<Button title="Update account" loading={loading} onPress={handleUpdateAccountPress} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	inputs: {
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
	},
	colors: {
		flexDirection: "row",
		gap: 16,
		justifyContent: "space-between",
	},
	color: {
		width: "45%",
		alignItems: "center",
	},
});

export default EditAccountForm;
