import GroupsHeader from "@/src/features/group/components/layout/GroupsHeader";
import { Stack } from "expo-router";

const GroupsLayout = () => {
	return (
		<Stack screenOptions={{ header: ({ options }) => <GroupsHeader title={options.title} /> }}>
			<Stack.Screen name="index" options={{ title: "Groups" }} />
			<Stack.Screen name="new" options={{ title: "New group" }} />
			<Stack.Screen name="[groupId]" options={{ headerShown: false }} />
		</Stack>
	);
};

export default GroupsLayout;
