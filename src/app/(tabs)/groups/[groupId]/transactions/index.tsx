import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import GroupTransactionListItem from "@/src/features/group/components/ui/GroupTransactionListItem";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const GroupTransactions = () => {
	// #region Hooks
	const { group } = useGroup();
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: `${group?.name} transactions` }} />

			<Animated.FlatList
				data={filteredTransactions}
				keyExtractor={(group) => group.id}
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
