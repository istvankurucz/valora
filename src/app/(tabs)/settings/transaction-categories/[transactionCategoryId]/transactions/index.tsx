import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import TransactionsSectionHeader from "@/src/features/transaction/components/ui/TransactionsSectionHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { MonthlyTransactionsStatsProvider } from "@/src/features/transaction/contexts/MonthlyTransactionsStatsContext";
import useTransactionsSection from "@/src/features/transaction/hooks/useTransactionsSection";
import TransactionCategoryTransactionListItem from "@/src/features/transactionCategory/components/ui/TransactionCategoryTransactionListItem";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { Link, Stack } from "expo-router";
import { SectionList, StyleSheet } from "react-native";

const TransactionCategoryTransactions = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { filteredTransactions } = useFilterTransactions();
	const { sectionsData, handleScroll } = useTransactionsSection(filteredTransactions);
	//#endregion

	return (
		<MonthlyTransactionsStatsProvider
			showIncome={transactionCategory?.type === "income"}
			showExpense={transactionCategory?.type === "expense"}
			showNetBalance={false}
			showTopExpenseCategory={false}
		>
			<Screen>
				<Stack.Screen
					options={{
						title: `${capitalizeString(transactionCategory?.name ?? "")} transactions`,
					}}
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
					onScroll={handleScroll}
				/>
			</Screen>
		</MonthlyTransactionsStatsProvider>
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
