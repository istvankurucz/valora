import { INITIAL_DATE } from "@/src/constants/initialDate";
import { TransactionSortProperty } from "../types/transactionTypes";
import { TransactionRecurring } from "./transactionRecurringOptions";
import { TRANSACTION_TYPE_OPTIONS, TransactionType } from "./transactionTypeOptions";

// New transaction
export const NEW_TRANSACTION_FORM_DATA = {
	type: "expense" as TransactionType,
	label: "",
	note: "",
	categoryId: "",
	timestamp: new Date(),
	amount: "",
	recurring: "" as TransactionRecurring | "",
	accountId: "",
	userId: "",
	groupId: "",
};
export type NewTransactionFormData = typeof NEW_TRANSACTION_FORM_DATA;

// Edit transaction

// Filter transactions
export const FILTER_TRANSACTIONS_FORM_DATA = {
	searchText: "",
	types: TRANSACTION_TYPE_OPTIONS as unknown as TransactionType[],
	categoryIds: [] as string[],
	startDate: INITIAL_DATE,
	endDate: INITIAL_DATE,
	accountIds: [] as string[],
	groupIds: [] as string[],
	sortProperty: "timestamp" as TransactionSortProperty,
	sortAsc: false,
};
export type FilterTransactionsFormData = typeof FILTER_TRANSACTIONS_FORM_DATA;
