import SpecialTabBarIcon from "@/src/features/navigation/components/ui/SpecialTabBarIcon";
import TabBarIcon from "@/src/features/navigation/components/ui/TabBarIcon";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				popToTopOnBlur: true,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBar,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name="accounts"
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon name="wallet" focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name="create-transaction"
				options={{
					tabBarIcon: ({ focused }) => <SpecialTabBarIcon focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name="groups"
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon name="people" focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ focused }) => <TabBarIcon name="settings" focused={focused} />,
				}}
			/>
		</Tabs>
	);
};

// Styles
const styles = StyleSheet.create({
	tabBar: {
		paddingTop: 8,
		marginBottom: 16,
	},
});

export default TabsLayout;
