import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";

// Transaction categories chart options
export const TRANSACTION_CATEGORIES_CHART_FORM_DATA = {
	types: ["expense"] as TransactionType[],
};
export type TransactionCategoriesChartFormData = typeof TRANSACTION_CATEGORIES_CHART_FORM_DATA;

// Accounts balance chart options
export const ACCOUNTS_BALANCE_CHART_FORM_DATA = {
	types: ["income", "expense"] as TransactionType[],
};
export type AccountsBalanceChartFormData = typeof ACCOUNTS_BALANCE_CHART_FORM_DATA;

// Group members balance chart options
export const GROUP_MEMBERS_BALANCE_CHART_FORM_DATA = {
	types: ["expense"] as TransactionType[],
	relativeToMaximum: false,
};
export type GroupMembersBalanceChartFormData = typeof GROUP_MEMBERS_BALANCE_CHART_FORM_DATA;
