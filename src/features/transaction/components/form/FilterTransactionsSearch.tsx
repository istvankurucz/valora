import Input from "@/src/components/form/Input/Input";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useFilterTransactions } from "../../contexts/FilterTransactionsContext";
import filterTransactions from "../../utils/filterTransactions";
import sortTransactions from "../../utils/sortTransactions";

const FilterTransactionsSearch = () => {
	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Hooks
	const { transactions, setFilteredTransactions, data, updateData } = useFilterTransactions();

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			// Filter transactions
			const filteredTransactions = filterTransactions(transactions, data);

			// Sort transactions
			const sortedTransactions = sortTransactions(filteredTransactions, data);

			// Update state
			setFilteredTransactions(sortedTransactions);
		}, 500);
	});
	//#endregion

	return (
		<View style={styles.container}>
			<Input
				search={true}
				placeholder="Search transaction"
				value={data.searchText}
				onChangeText={(searchText) => updateData({ searchText })}
			/>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		marginBottom: 8,
	},
});

export default FilterTransactionsSearch;
