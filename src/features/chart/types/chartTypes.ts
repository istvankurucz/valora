import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";

// #region Balance chart
export type BalanceChartData = {
	income: { value: number };
	expense: { value: number };
};
//#endregion

// #region Accounts balance chart
export type AccountBalanceChartData = {
	label: string;
	income: { value: number };
	expense: { value: number };
};
//#endregion

// #region Transaction categories chart
export type TransactionCategoriesChartData = {
	type: TransactionType;
	label: string;
	value: number;
};
//#endregion
