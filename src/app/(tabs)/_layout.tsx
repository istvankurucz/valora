import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}>
			<Tabs.Screen name="index" />
		</Tabs>
	);
};

// Styles
const styles = StyleSheet.create({
	tabBar: {
		// backgroundColor: "blue",
		marginBottom: 8,
	},
});

export default TabsLayout;
