import GroupMembersHeader from "@/src/features/group/components/layout/GroupMembersHeader";
import { Stack } from "expo-router";

const GroupMembersLayout = () => {
	return (
		<Stack
			screenOptions={{
				header: ({ options }) => <GroupMembersHeader title={options.title} />,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="new" options={{ title: "Add members" }} />
			<Stack.Screen name="[memberId]" options={{ headerShown: false }} />
		</Stack>
	);
};

export default GroupMembersLayout;
