import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import GroupTransactionListItem from "@/src/features/group/components/ui/GroupTransactionListItem";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import TransactionsSectionHeader from "@/src/features/transaction/components/ui/TransactionsSectionHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import getTransactionsSectionData from "@/src/features/transaction/utils/getTransactionsSectionData";
import { Link, Stack } from "expo-router";
import { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";

const GroupTransactions = () => {
	// #region Hooks
	const { group } = useGroup();
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
			<Stack.Screen options={{ title: `${group?.name} transactions` }} />

			<SectionList
				sections={sectionsData}
				keyExtractor={(transaction) => transaction.id}
				renderSectionHeader={({ section }) => <TransactionsSectionHeader section={section} />}
				renderItem={({ item: transaction }) => (
					<Link href={`/groups/${group?.id}/transactions/${transaction.id}`} asChild>
						<GroupTransactionListItem transaction={transaction} />
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

export default GroupTransactions;
