import Screen from "@/src/components/layout/Screen";
import ThemedText from "@/src/components/ui/ThemedText";
import { DEFAULT_CATEGORIES } from "@/src/constants/defaultCategories";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
	// #region Hooks
	const { admin, loading } = useAdminUser();
	//#endregion

	return (
		<Screen>
			<ScrollView>
				<Text>Home</Text>

				{loading && <ThemedText>Loading admin user...</ThemedText>}
				{!loading && <ThemedText>{JSON.stringify(admin, null, " ")}</ThemedText>}

				{Object.values(DEFAULT_CATEGORIES.income).map((category) => (
					<View key={category.name}>
						<View
							style={{
								width: 48,
								height: 48,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: category.colors.background,
							}}
						>
							<FontAwesome
								name={category.icon}
								size={24}
								color={category.colors.foreground}
							/>
						</View>
						<Text>{category.name}</Text>
					</View>
				))}
				{Object.values(DEFAULT_CATEGORIES.expense).map((category) => (
					<View key={category.name}>
						<View
							style={{
								width: 48,
								height: 48,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: category.colors.background,
							}}
						>
							<FontAwesome
								name={category.icon}
								size={24}
								color={category.colors.foreground}
							/>
						</View>
						<Text>{category.name}</Text>
					</View>
				))}
			</ScrollView>
		</Screen>
	);
};

export default Home;
