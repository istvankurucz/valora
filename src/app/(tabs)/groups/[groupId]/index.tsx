import Screen from "@/src/components/layout/Screen/Screen";
import GroupLatestTransactions from "@/src/features/group/components/layout/GroupLatestTransactions";
import GroupLatestUsers from "@/src/features/group/components/layout/GroupLatestUsers";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const Group = () => {
	//#region Hooks
	const { group } = useGroup();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: group?.name }} />

			<Screen.ScrollView contentContainerStyle={styles.container}>
				<GroupLatestTransactions />
				<GroupLatestUsers />
			</Screen.ScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default Group;
