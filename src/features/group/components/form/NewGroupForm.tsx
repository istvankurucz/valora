import FullIconInput from "@/src/components/form/IconInput/FullIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import formatHexColor from "@/src/utils/color/formatHexColor";
import { useRouter } from "expo-router";
import { useNewGroup } from "../../contexts/NewGroupContext";
import useCreateGroup from "../../hooks/useCreateGroup";
import useCreateGroupUsers from "../../hooks/useCreateGroupUsers";
import validateNewGroupData from "../../utils/validation/validateNewGroupData";

const NewGroupForm = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { data, updateData } = useNewGroup();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { createGroup, loading: loadingCreateGroup } = useCreateGroup();
	const { createGroupUsers, loading: loadingCreateGroupUsers } = useCreateGroupUsers();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingCreateIcon || loadingCreateGroup || loadingCreateGroupUsers;
	//#endregion

	//#region Functions
	async function handleCreateAccountPress() {
		// Check admin
		if (!admin) return;

		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { name, icon, foregroundColor, backgroundColor } = validateNewGroupData({
				name: data.name,
				icon: data.icon,
				foregroundColor: formatHexColor(data.foregroundColor),
				backgroundColor: formatHexColor(data.backgroundColor),
			});

			// Create group
			const createdIcon = await createIcon({ name: icon, foregroundColor, backgroundColor });
			const group = await createGroup({
				name,
				iconId: createdIcon.id,
			});
			await createGroupUsers({ groupId: group.id, userIds: [admin.id] });

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
					label="Group name"
					placeholder="Group name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
			</InputsContainer>

			<Button title="Create group" loading={loading} onPress={handleCreateAccountPress} />
		</ThemedView>
	);
};

export default NewGroupForm;
