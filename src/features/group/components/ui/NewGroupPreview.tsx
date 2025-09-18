import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import generateUUID from "@/src/utils/uuid/generateUUID";
import { useNewGroup } from "../../contexts/NewGroupContext";
import { Group } from "../../types/groupTypes";
import GroupListItem from "./GroupListItem";

const NewGroupPreview = () => {
	//#region Hooks
	const { admin } = useAdminUser();
	const { data } = useNewGroup();
	//#endregion

	// #region Constants
	const groupData: Group = {
		id: generateUUID(),
		name: data.name,
		icon: {
			id: generateUUID(),
			name: data.icon,
			foregroundColor: data.foregroundColor,
			backgroundColor: data.backgroundColor,
		},
		transactions: [],
		users: [
			{
				id: admin?.id ?? "",
				name: admin?.name ?? "",
				admin: admin?.admin ?? true,
				addedAt: new Date().toISOString(),
			},
		],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	//#endregion

	return (
		<ThemedView>
			<SectionTitle>Preview</SectionTitle>
			<GroupListItem group={groupData} />
		</ThemedView>
	);
};

export default NewGroupPreview;
