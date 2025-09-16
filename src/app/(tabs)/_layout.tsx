import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import Ionicons from "@expo/vector-icons/Ionicons";
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
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons name={`home${focused ? "" : "-outline"}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="accounts"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons name={`wallet${focused ? "" : "-outline"}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="create-transaction"
				options={{
					tabBarIcon: ({ focused, size }) => (
						<ThemedView
							variant="neutral"
							shade={focused ? 900 : 800}
							style={{
								width: 48,
								height: 48,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: BORDER_RADIUS[500],
							}}
						>
							<Ionicons name={"add"} color={"white"} size={size} />
						</ThemedView>
					),
				}}
			/>
			<Tabs.Screen
				name="groups"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons name={`people${focused ? "" : "-outline"}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={`settings${focused ? "" : "-outline"}`}
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

// Styles
const styles = StyleSheet.create({
	tabBar: {
		marginBottom: 8,
	},
});

export default TabsLayout;
