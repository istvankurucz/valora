import Screen from "@/src/components/layout/Screen/Screen";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import { Stack } from "expo-router";
import { Text } from "react-native";

const Group = () => {
	//#region Hooks
	const { group } = useGroup();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: group?.name }} />

			<Text>Group</Text>
		</Screen>
	);
};

export default Group;
