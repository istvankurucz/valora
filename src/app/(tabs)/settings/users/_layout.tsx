import SettingsMembersHeader from "@/src/features/user/components/layout/SettingsMembersHeader";
import { UsersProvider } from "@/src/features/user/contexts/UsersContext";
import { Stack } from "expo-router";

const SettingsMembersLayout = () => {
	return (
		<UsersProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => <SettingsMembersHeader title={options.title} />,
				}}
			>
				<Stack.Screen name="index" options={{ title: "Users" }} />
				<Stack.Screen name="new" options={{ title: "New user" }} />
				<Stack.Screen name="[userId]" options={{ headerShown: false }} />
			</Stack>
		</UsersProvider>
	);
};

export default SettingsMembersLayout;
