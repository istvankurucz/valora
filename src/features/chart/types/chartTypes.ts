import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";

// #region Bar chart
export type BarDataType = TransactionType;
export type BarData = {
	value: number;
	type: BarDataType;
	label: string;
	width?: number;
	barColor?: string;
	backgroundColor?: string;
};
export type BarGroup = {
	bars: BarData[];
	label?: string;
};
export type BarChartData = {
	groups: BarGroup[];
};
export type ChartValue = {
	value: number;
	type: BarDataType;
	label: string;
};
//#endregion

// #region Balance chart
export type BalanceChartData = {
	income: { value: number };
	expense: { value: number };
};
export type BalanceBreakdownChartData = {
	label: string;
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

// #region Group members balance chart
export type GroupMembersBalanceChartData = {
	name: string;
	income: { value: number };
	expense: { value: number };
};
//#endregion
