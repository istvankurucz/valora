import { Stack } from "expo-router";

const GroupsLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Groups" }} />
		</Stack>
	);
};

export default GroupsLayout;
