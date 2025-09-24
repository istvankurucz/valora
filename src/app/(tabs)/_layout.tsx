import TabsHeader from "@/src/components/layout/TabsHeader";
import SpecialTabBarIcon from "@/src/features/navigation/components/ui/SpecialTabBarIcon";
import TabBarIcon from "@/src/features/navigation/components/ui/TabBarIcon";
import useThemeColor from "@/src/hooks/useThemeColor";
import { Tabs, usePathname } from "expo-router";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
	// #region Hooks
	const pathname = usePathname();

	const backgroundColor = useThemeColor({ variant: "neutral", shade: 100 });
	const shadowColor = useThemeColor({ variant: "neutral", shade: 300 });
	//#endregion

	// #region Constants
	const showHeader = pathname === "/new-transaction" || pathname === "/edit-transaction";
	//#endregion

	return (
		<Tabs
			screenOptions={{
				headerShown: showHeader,
				header: ({ options }) => <TabsHeader title={options.title} />,
				popToTopOnBlur: true,
				tabBarShowLabel: false,
				tabBarStyle: [
					styles.tabBar,
					{
						backgroundColor,
						boxShadow: [{ offsetX: 0, offsetY: 0, color: shadowColor, blurRadius: 8 }],
					},
				],
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
				name="new-transaction"
				options={{
					title: "New transaction",
					tabBarIcon: ({ focused }) => <SpecialTabBarIcon focused={focused} />,
				}}
			/>
			<Tabs.Screen
				name="edit-transaction"
				options={{
					href: null,
					title: "Edit transaction",
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
