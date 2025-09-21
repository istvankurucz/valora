import Screen from "@/src/components/layout/Screen/Screen";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import TransactionCategoryListItem from "@/src/features/transactionCategory/components/ui/TransactionCategoryListItem";
import { useTransactionCategories } from "@/src/features/transactionCategory/contexts/TransactionCategoriesContext";
import useUpdateTransactionCategory from "@/src/features/transactionCategory/hooks/useUpdateTransactionCategory";
import { TransactionCategory } from "@/src/features/transactionCategory/types/transactionCategoryTypes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const ReorderCategories = () => {
	// #region States
	const [categories, setCategories] = useState<TransactionCategory[]>([]);
	//#endregion

	//#region Hooks
	const { transactionCategories } = useTransactionCategories();
	const { type } = useLocalSearchParams<{ type?: TransactionType }>();
	const { updateTransactionCategory } = useUpdateTransactionCategory();
	const { setError } = useError();

	useEffect(() => {
		if (transactionCategories.length === 0) return;

		setCategories(
			transactionCategories.filter((category) => category.type === (type ?? "expense"))
		);
	}, [transactionCategories, type]);
	//#endregion

	// #region Functions
	function handleDragEnd(data: TransactionCategory[]) {
		// Get categories based on type
		const currentCategories = categories.filter(
			(category) => category.type === (type ?? "expense")
		);
		const newCategories = data.filter((category) => category.type === (type ?? "expense"));

		// Check same order
		const currentCategoriesOrder = currentCategories.map((category) => category.order).join();
		const newCategoriesOrder = newCategories.map((category) => category.order).join();
		if (newCategoriesOrder === currentCategoriesOrder) return;

		// Update categories state
		setCategories(newCategories);

		// Update order
		newCategories.forEach(async (category, i) => {
			try {
				await updateTransactionCategory({ id: category.id, data: { order: i + 1 } });
			} catch (err) {
				setError(err);
			}
		});
	}
	//#endregion

	return (
		<Screen>
			<DraggableFlatList
				data={categories}
				keyExtractor={(category) => category.id}
				renderItem={({ item: category, drag }) => (
					<TransactionCategoryListItem
						transactionCategory={category}
						onLongPress={drag}
						sortable
					/>
				)}
				onDragEnd={({ data }) => handleDragEnd(data)}
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

export default ReorderCategories;
