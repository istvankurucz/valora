import Screen from "@/src/components/layout/Screen/Screen";
import GroupLatestTransactions from "@/src/features/group/components/layout/GroupLatestTransactions";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import { Stack } from "expo-router";

const Group = () => {
	//#region Hooks
	const { group } = useGroup();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: group?.name }} />

			<Screen.ScrollView>
				<GroupLatestTransactions />
			</Screen.ScrollView>
		</Screen>
	);
};

export default Group;
