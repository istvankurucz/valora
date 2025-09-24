import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import TransactionCategoryTransactionListItem from "@/src/features/transactionCategory/components/ui/TransactionCategoryTransactionListItem";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { Link, Stack } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const TransactionCategoryTransactions = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	return (
		<Screen>
			<Stack.Screen
				options={{ title: `${capitalizeString(transactionCategory?.name ?? "")} transactions` }}
			/>

			<FlatList
				data={filteredTransactions}
				keyExtractor={(category) => category.id}
				renderItem={({ item: transaction }) => (
					<Link
						href={`/settings/transaction-categories/${transactionCategory?.id}/transactions/${transaction.id}`}
						asChild
					>
						<TransactionCategoryTransactionListItem transaction={transaction} />
					</Link>
				)}
				ListHeaderComponent={<FilterTransactionsSearch />}
				ListEmptyComponent={<Section.Empty icon="card-outline" text="No transactions." />}
				contentContainerStyle={styles.container}
			/>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		gap: 12,
	},
});

export default TransactionCategoryTransactions;
