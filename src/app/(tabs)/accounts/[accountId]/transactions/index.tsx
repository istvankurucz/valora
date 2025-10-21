import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import AccountTransactionListItem from "@/src/features/account/components/ui/AccountTransactionListItem";
import { useAccount } from "@/src/features/account/contexts/AccountContext";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import TransactionsSectionHeader from "@/src/features/transaction/components/ui/TransactionsSectionHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import getTransactionsSectionData from "@/src/features/transaction/utils/getTransactionsSectionData";
import { Link, Stack } from "expo-router";
import { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";

const AccountTransactions = () => {
	// #region Hooks
	const { account } = useAccount();
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
			<Stack.Screen options={{ title: `${account?.name} transactions` }} />

			<SectionList
				sections={sectionsData}
				keyExtractor={(transaction) => transaction.id}
				renderSectionHeader={({ section }) => <TransactionsSectionHeader section={section} />}
				renderItem={({ item: transaction }) => (
					<Link href={`/accounts/${account?.id}/transactions/${transaction.id}`} asChild>
						<AccountTransactionListItem transaction={transaction} />
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
		gap: 12,
		paddingTop: 16,
		paddingBottom: 32,
	},
});

export default AccountTransactions;
