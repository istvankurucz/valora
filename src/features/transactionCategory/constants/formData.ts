import { TransactionType } from "../../transaction/constants/transactionTypeOptions";

// New category
export const NEW_TRANSACTION_CATEGORY_FORM_DATA = {
	type: "expense" as TransactionType,
	name: "",
	icon: "",
	foregroundColor: "#cccccc",
	backgroundColor: "#000000",
};
export type NewTransactionCategoryFormData = typeof NEW_TRANSACTION_CATEGORY_FORM_DATA;

// Edit category
export const EDIT_TRANSACTION_CATEGORY_FORM_DATA = {
	type: "expense" as TransactionType,
	name: "",
	icon: "",
	foregroundColor: "#cccccc",
	backgroundColor: "#000000",
};
export type EditTransactionCategoryFormData = typeof EDIT_TRANSACTION_CATEGORY_FORM_DATA;

// Delete category
export const DELETE_TRANSACTION_CATEGORY_FORM_DATA = {
	deleteTransactions: false,
	newCategoryId: "",
};
export type DeleteTransactionCategoryFormData = typeof DELETE_TRANSACTION_CATEGORY_FORM_DATA;
