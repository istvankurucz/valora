import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";

// Transaction categories chart options
export const TRANSACTION_CATEGORIES_CHART_FORM_DATA = {
	types: ["income", "expense"] as TransactionType[],
};
export type TransactionCategoriesChartFormData = typeof TRANSACTION_CATEGORIES_CHART_FORM_DATA;

// Accounts balance chart options
export const ACCOUNTS_BALANCE_CHART_FORM_DATA = {
	types: ["income", "expense"] as TransactionType[],
};
export type AccountsBalanceChartFormData = typeof ACCOUNTS_BALANCE_CHART_FORM_DATA;
