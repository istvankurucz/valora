import Screen from "@/src/components/layout/Screen/Screen";
import ThemedText from "@/src/components/ui/ThemedText";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import { Stack } from "expo-router";
import capitalizeString from "../../../../../utils/string/capitalizeString";

const TransactionCategory = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: capitalizeString(transactionCategory?.name ?? "") }} />

			<ThemedText>TransactionCategory</ThemedText>
		</Screen>
	);
};

export default TransactionCategory;
