import FullIconInput from "@/src/components/form/IconInput/FullIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useUpdateIcon from "@/src/features/icon/hooks/useUpdateIcon";
import formatHexColor from "@/src/utils/color/formatHexColor";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useEditGroup } from "../../contexts/EditGroupContext";
import { useGroup } from "../../contexts/GroupContext";
import useUpdateGroup from "../../hooks/useUpdateGroup";
import validateEditGroupData from "../../utils/validation/validateEditGroupData";

const EditGroupForm = () => {
	// #region Hooks
	const { group } = useGroup();
	const { data, updateData } = useEditGroup();
	const { updateIcon, loading: loadingUpdateIcon } = useUpdateIcon();
	const { updateGroup, loading: loadingUpdateGroup } = useUpdateGroup();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingUpdateIcon || loadingUpdateGroup;
	//#endregion

	// #region Functions
	async function handleUpdateGroupPress() {
		// Check group
		if (!group) return;

		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { name, icon, foregroundColor, backgroundColor } = validateEditGroupData({
				name: data.name,
				icon: data.icon,
				foregroundColor: formatHexColor(data.foregroundColor),
				backgroundColor: formatHexColor(data.backgroundColor),
			});

			// Create group
			await updateIcon({
				id: group.icon.id,
				data: { name: icon, foregroundColor, backgroundColor },
			});
			await updateGroup({
				id: group.id,
				data: { name },
			});

			// Navigate
			router.dismissTo(`/groups/${group.id}`);
		} catch (err) {
			console.log(err);
			addError(err);
		}
	}
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Group data</Section.Title>

			<InputsContainer shade={100} style={styles.inputs}>
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
					label="Group name"
					placeholder="Group name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
			</InputsContainer>

			<Button title="Update group" loading={loading} onPress={handleUpdateGroupPress} />
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	inputs: {
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
	},
});

export default EditGroupForm;
