import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import AccountTransactionListItem from "@/src/features/account/components/ui/AccountTransactionListItem";
import { useAccount } from "@/src/features/account/contexts/AccountContext";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { Stack } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const AccountTransactions = () => {
	// #region Hooks
	const { account } = useAccount();
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: `${account?.name} transactions` }} />

			<FlatList
				data={filteredTransactions}
				keyExtractor={(account) => account.id}
				renderItem={({ item }) => <AccountTransactionListItem transaction={item} />}
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

export default AccountTransactions;
