import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { Stack } from "expo-router";

const RootNavigator = () => {
	//#region Hooks
	const { admin, loading } = useAdminUser();
	//#endregion

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={admin == null && !loading}>
				<Stack.Screen name="create-account" />
			</Stack.Protected>

			<Stack.Protected guard={admin != null}>
				<Stack.Screen name="(tabs)" />
			</Stack.Protected>
		</Stack>
	);
};

export default RootNavigator;
