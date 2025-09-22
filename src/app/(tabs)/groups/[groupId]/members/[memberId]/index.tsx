import Screen from "@/src/components/layout/Screen/Screen";
import GroupMemberTransactions from "@/src/features/group/components/layout/GroupMemberTransactions";
import { useGroupMember } from "@/src/features/group/contexts/GroupMemberContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { Stack } from "expo-router";

const GroupMember = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { member } = useGroupMember();
	//#endregion

	return (
		<Screen>
			<Stack.Screen
				options={{ title: `${member?.name}${member?.id === admin?.id ? " (Me)" : ""}` }}
			/>

			<Screen.ScrollView>
				<GroupMemberTransactions />
			</Screen.ScrollView>
		</Screen>
	);
};

export default GroupMember;
