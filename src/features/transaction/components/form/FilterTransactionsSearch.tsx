import Input from "@/src/components/form/Input/Input";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet, View } from "react-native";
import { useFilterTransactions } from "../../contexts/FilterTransactionsContext";

const FilterTransactionsSearch = () => {
	// #region Hooks
	const { filteredTransactions, data, updateData, filterCount } = useFilterTransactions();
	//#endregion

	// #region Constants
	const showCount = filterCount > 0 || data.searchText.length > 0;
	//#endregion

	return (
		<View style={[styles.container, !showCount ? { marginBottom: 8 } : undefined]}>
			<Input
				search={true}
				placeholder="Search transaction"
				value={data.searchText}
				onChangeText={(searchText) => updateData({ searchText })}
			/>
			{showCount && (
				<ThemedText shade={600} style={styles.count}>
					{filteredTransactions.length} result{filteredTransactions.length !== 1 ? "s" : ""}
				</ThemedText>
			)}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	count: {
		fontSize: FONT_SIZE[400],
	},
});

export default FilterTransactionsSearch;
