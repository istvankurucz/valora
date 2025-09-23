import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";

export const TRANSACTION_CATEGORIES_CHART_FORM_DATA = {
	types: ["income", "expense"] as TransactionType[],
};
export type TransactionCategoriesChartFormData = typeof TRANSACTION_CATEGORIES_CHART_FORM_DATA;
