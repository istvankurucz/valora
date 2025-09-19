import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { Link } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTransactionCategories } from "../../contexts/TransactionCategoriesContext";
import TransactionCategoryListItem from "../ui/TransactionCategoryListItem";

const TransactionCategoriesList = () => {
	//#region Hooks
	const { transactionCategories } = useTransactionCategories();
	//#endregion

	// #region Constants
	const incomeCategories = useMemo(
		() => transactionCategories.filter((category) => category.type === "income"),
		[transactionCategories]
	);
	const expenseCategories = useMemo(
		() => transactionCategories.filter((category) => category.type === "expense"),
		[transactionCategories]
	);
	//#endregion

	return (
		<ThemedView style={styles.container}>
			<View>
				<Section.Title>Income categories</Section.Title>
				<ListContainer>
					{incomeCategories.map((category) => (
						<Link
							key={category.id}
							href={`/settings/transaction-categories/${category.id}`}
							asChild
						>
							<TransactionCategoryListItem transactionCategory={category} />
						</Link>
					))}
				</ListContainer>
			</View>

			<View>
				<Section.Title>Expense categories</Section.Title>
				<ListContainer>
					{expenseCategories.map((category) => (
						<Link
							key={category.id}
							href={`/settings/transaction-categories/${category.id}`}
							asChild
						>
							<TransactionCategoryListItem transactionCategory={category} />
						</Link>
					))}
				</ListContainer>
			</View>
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default TransactionCategoriesList;
