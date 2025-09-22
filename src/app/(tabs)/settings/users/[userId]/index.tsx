import Screen from "@/src/components/layout/Screen/Screen";
import UserGroups from "@/src/features/user/components/layout/UserGroups";
import { useUser } from "@/src/features/user/contexts/UserContext";
import { Stack } from "expo-router";

const SettingsMember = () => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: user?.name }} />

			<Screen.ScrollView>
				<UserGroups />
			</Screen.ScrollView>
		</Screen>
	);
};

export default SettingsMember;
