import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import TransactionsSectionHeader from "@/src/features/transaction/components/ui/TransactionsSectionHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import getTransactionsSectionData from "@/src/features/transaction/utils/getTransactionsSectionData";
import TransactionCategoryTransactionListItem from "@/src/features/transactionCategory/components/ui/TransactionCategoryTransactionListItem";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { Link, Stack } from "expo-router";
import { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";

const TransactionCategoryTransactions = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	// #region Constants
	const sectionsData = useMemo(
		() => getTransactionsSectionData(filteredTransactions),
		[filteredTransactions]
	);
	//#endregion

	return (
		<Screen>
			<Stack.Screen
				options={{ title: `${capitalizeString(transactionCategory?.name ?? "")} transactions` }}
			/>

			<SectionList
				sections={sectionsData}
				keyExtractor={(transaction) => transaction.id}
				renderSectionHeader={({ section }) => (
					<TransactionsSectionHeader
						section={section}
						showAnimation={false}
						showByDefault={transactionCategory?.type}
					/>
				)}
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
				showsVerticalScrollIndicator={false}
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
