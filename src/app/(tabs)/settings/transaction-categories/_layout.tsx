import TransactionCategoriesHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoriesHeader";
import { TransactionCategoriesProvider } from "@/src/features/transactionCategory/contexts/TransactionCategoriesContext";
import { Stack } from "expo-router";

const TrancationCategoriesLayout = () => {
	return (
		<TransactionCategoriesProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => <TransactionCategoriesHeader title={options.title} />,
				}}
			>
				<Stack.Screen name="index" options={{ title: "Transaction categories" }} />
				<Stack.Screen name="new" options={{ title: "New category" }} />
				<Stack.Screen name="reorder-categories" options={{ title: "Reorder categories" }} />
				<Stack.Screen name="[transactionCategoryId]" options={{ headerShown: false }} />
			</Stack>
		</TransactionCategoriesProvider>
	);
};

export default TrancationCategoriesLayout;
