import TransactionCategoriesHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoriesHeader";
import { Stack } from "expo-router";

const TrancationCategoriesLayout = () => {
	return (
		<Stack
			screenOptions={{
				header: ({ options }) => <TransactionCategoriesHeader title={options.title} />,
			}}
		>
			<Stack.Screen name="index" options={{ title: "Transaction categories" }} />
			<Stack.Screen name="new" options={{ title: "New category" }} />
			<Stack.Screen name="[transactionCategoryId]" options={{ headerShown: false }} />
		</Stack>
	);
};

export default TrancationCategoriesLayout;
