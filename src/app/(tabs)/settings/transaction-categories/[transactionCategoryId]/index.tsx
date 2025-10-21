import Screen from "@/src/components/layout/Screen/Screen";
import TransactionCategoryChart from "@/src/features/transactionCategory/components/layout/TransactionCategoryChart";
import TransactionCategoryLatestTransactions from "@/src/features/transactionCategory/components/layout/TransactionCategoryLatestTransactions";
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

			<Screen.ScrollView>
				<Screen.Container>
					<TransactionCategoryChart />
					<TransactionCategoryLatestTransactions />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default TransactionCategory;
