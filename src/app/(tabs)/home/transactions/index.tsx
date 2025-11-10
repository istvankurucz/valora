import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import TransactionsSectionHeader from "@/src/features/transaction/components/ui/TransactionsSectionHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { MonthlyTransactionsStatsProvider } from "@/src/features/transaction/contexts/MonthlyTransactionsStatsContext";
import getTransactionsSectionData from "@/src/features/transaction/utils/getTransactionsSectionData";
import AdminTransactionListItem from "@/src/features/user/components/ui/AdminTransactionListItem";
import { Link } from "expo-router";
import { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";

const HomeTransactions = () => {
	// #region Hooks
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	// #region Constants
	const sectionsData = useMemo(
		() => getTransactionsSectionData(filteredTransactions),
		[filteredTransactions]
	);
	//#endregion

	return (
		<MonthlyTransactionsStatsProvider>
			<Screen>
				<SectionList
					sections={sectionsData}
					keyExtractor={(transaction) => transaction.id}
					renderSectionHeader={({ section }) => (
						<TransactionsSectionHeader section={section} />
					)}
					renderItem={({ item: transaction }) => (
						<Link href={`/home/transactions/${transaction.id}`} asChild>
							<AdminTransactionListItem transaction={transaction} />
						</Link>
					)}
					ListHeaderComponent={<FilterTransactionsSearch />}
					ListEmptyComponent={<Section.Empty icon="card-outline" text="No transactions." />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.container}
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
		paddingBottom: 32,
	},
});

export default HomeTransactions;
