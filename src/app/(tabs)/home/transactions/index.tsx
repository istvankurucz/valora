import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import FilterTransactionsSearch from "@/src/features/transaction/components/form/FilterTransactionsSearch";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import AdminTransactionListItem from "@/src/features/user/components/ui/AdminTransactionListItem";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const HomeTransactions = () => {
	// #region Hooks
	const { filteredTransactions } = useFilterTransactions();
	//#endregion

	return (
		<Screen>
			<Animated.FlatList
				data={filteredTransactions}
				keyExtractor={(transaction) => transaction.id}
				renderItem={({ item: transaction }) => (
					<Link href={`/home/transactions/${transaction.id}`} asChild>
						<AdminTransactionListItem transaction={transaction} />
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

export default HomeTransactions;
