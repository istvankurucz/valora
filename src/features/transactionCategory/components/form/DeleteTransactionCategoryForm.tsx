import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import useFormData from "@/src/features/form/hooks/useFormData";
import useDeleteTransactionsByCategoryId from "@/src/features/transaction/hooks/useDeleteTransactionsByCategoryId";
import { SelectOption } from "@/src/types/uiTypes";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { DELETE_TRANSACTION_CATEGORY_FORM_DATA } from "../../constants/formData";
import useDeleteTransactionCategory from "../../hooks/useDeleteTransactionCategory";
import useGetTransactionCategories from "../../hooks/useGetTransactionCategories";
import useGetTransactionCategory from "../../hooks/useGetTransactionCategory";
import useMoveTransactionCategoryTransactionsToDifferentTransactionCategory from "../../hooks/useMoveTransactionCategoryTransactionsToDifferentTransactionCategory";
import validateDeleteTransactionCategoryData from "../../utils/validation/validateDeleteTransactionCategoryData";
import TransactionCategoryOption from "../ui/TransactionCategoryOption";

const DeleteTransactionCategoryForm = () => {
	// #region Hooks
	const { transactionCategories } = useGetTransactionCategories();
	const { transactionCategory } = useGetTransactionCategory();
	const { data, updateData } = useFormData(DELETE_TRANSACTION_CATEGORY_FORM_DATA);
	const { deleteTransactionCategory, loading: loadingDeleteTransactionCategory } =
		useDeleteTransactionCategory();
	const {
		moveTransactionCategoryTransactionsToDifferentTransactionCategory,
		loading: loadingMovingTransactions,
	} = useMoveTransactionCategoryTransactionsToDifferentTransactionCategory();
	const { deleteTransactionsByCategoryId, loading: loadingDeleteTransactions } =
		useDeleteTransactionsByCategoryId();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	const router = useRouter();
	//#endregion

	// #region Constants
	const NEW_CATEGORY_OPTIONS: SelectOption[] = useMemo(
		() =>
			transactionCategories
				.filter(
					(category) =>
						category.type === transactionCategory?.type &&
						category.id !== transactionCategory.id
				)
				.map((category) => ({
					value: category.id,
					label: <TransactionCategoryOption transactionCategory={category} />,
				})),
		[transactionCategories, transactionCategory]
	);

	const loading =
		loadingDeleteTransactionCategory || loadingMovingTransactions || loadingDeleteTransactions;
	//#endregion

	// #region Functions
	async function handleDeleteTransactionCategoryPress() {
		// Check transaction category
		if (!transactionCategory) return;

		try {
			// Validation
			const deleteData = validateDeleteTransactionCategoryData(data);

			// Delete transaction category
			if (!deleteData.deleteTransactions) {
				await moveTransactionCategoryTransactionsToDifferentTransactionCategory({
					transactionIds: transactionCategory.transactions.map(
						(transaction) => transaction.id
					),
					newTransactionCategoryId: deleteData.newCategoryId,
				});
			} else {
				await deleteTransactionsByCategoryId(transactionCategory.id);
			}
			await deleteTransactionCategory(transactionCategory.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Category deleted.",
			});

			// Navigate
			router.dismissTo("/settings/transaction-categories");
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<View>
			<InputsContainer style={styles.inputs}>
				{!data.deleteTransactions && (
					<View style={styles.categories}>
						<ThemedText shade={600}>Select a new category for the transactions.</ThemedText>
						<FormSelect
							field="newCategoryId"
							label="Category"
							options={NEW_CATEGORY_OPTIONS}
							value={data.newCategoryId}
							onValueChange={(newCategoryId) => updateData({ newCategoryId })}
						/>
					</View>
				)}
				<FormCheckbox
					field="deleteTransactions"
					label="Delete transactions"
					value={data.deleteTransactions}
					onValueChange={(deleteTransactions) =>
						updateData({
							deleteTransactions,
						})
					}
				/>
			</InputsContainer>

			<Button
				variant="danger"
				title="Delete category"
				loading={loading}
				onPress={handleDeleteTransactionCategoryPress}
			/>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	categories: {
		gap: 8,
	},
	inputs: {
		paddingBottom: 0,
	},
});

export default DeleteTransactionCategoryForm;
