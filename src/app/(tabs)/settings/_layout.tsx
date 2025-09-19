import SettingsHeader from "@/src/features/user/components/layout/SettingsHeader";
import { Stack } from "expo-router";

const SettingsLayout = () => {
	return (
		<Stack screenOptions={{ header: ({ options }) => <SettingsHeader title={options.title} /> }}>
			<Stack.Screen name="index" options={{ title: "Settings" }} />
			<Stack.Screen name="my-data" options={{ title: "My data" }} />
			<Stack.Screen name="transaction-categories" options={{ headerShown: false }} />
		</Stack>
	);
};

export default SettingsLayout;
