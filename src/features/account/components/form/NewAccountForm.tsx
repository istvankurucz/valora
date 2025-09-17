import FormColorPicker from "@/src/components/form/ColorPicker/FormColorPicker";
import FormIconInput from "@/src/components/form/IconInput/FormIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import formatHexColor from "@/src/utils/color/formatHexColor";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useNewAccount } from "../../contexts/NewAccountContext";
import useCreateAccount from "../../hooks/useCreateAccount";
import validateNewAccountData from "../../utils/validation/validateNewAccountData";

const NewAccountForm = () => {
	// #region Hooks
	const { data, updateData } = useNewAccount();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { createAccount, loading: loadingCreateAccount } = useCreateAccount();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingCreateIcon || loadingCreateAccount;
	//#endregion

	// #region Functions
	async function handleCreateAccountPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { name, icon, foregroundColor, backgroundColor } = validateNewAccountData({
				name: data.name,
				icon: data.icon,
				foregroundColor: formatHexColor(data.foregroundColor),
				backgroundColor: formatHexColor(data.backgroundColor),
			});

			// Create account
			const createdIcon = await createIcon({ name: icon, foregroundColor, backgroundColor });
			const account = await createAccount({ name, iconId: createdIcon.id });

			// Navigate
			router.push(`/accounts/${account.id}`);
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
			</InputsContainer>

			<Button title="Create account" loading={loading} onPress={handleCreateAccountPress} />
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

export default NewAccountForm;
