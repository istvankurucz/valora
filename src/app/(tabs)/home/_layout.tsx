import { AdminTransactionsProvider } from "@/src/features/user/contexts/AdminTransactionsContext";
import { Stack } from "expo-router";

const HomeLayout = () => {
	return (
		<AdminTransactionsProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="transactions" options={{ headerShown: false }} />
			</Stack>
		</AdminTransactionsProvider>
	);
};

export default HomeLayout;
