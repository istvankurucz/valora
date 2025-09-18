import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import generateUUID from "@/src/utils/uuid/generateUUID";
import { useEditGroup } from "../../contexts/EditGroupContext";
import { useGroup } from "../../contexts/GroupContext";
import { Group } from "../../types/groupTypes";
import GroupListItem from "./GroupListItem";

const EditGroupPreview = () => {
	//#region Hooks
	const { group } = useGroup();
	const { data } = useEditGroup();
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
		transactions: group?.transactions ?? [],
		users: group?.users ?? [],
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

export default EditGroupPreview;
