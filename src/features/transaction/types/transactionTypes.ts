import { TransactionTable } from "@/src/db/schemas/Transaction";

// #region DB types
export type TransactionSelect = typeof TransactionTable.$inferSelect;
export type TransactionInsert = typeof TransactionTable.$inferInsert;
export type TransactionUpdate = Partial<
	Pick<
		TransactionSelect,
		| "type"
		| "label"
		| "note"
		| "categoryId"
		| "timestamp"
		| "amount"
		| "currency"
		| "recurring"
		| "accountId"
		| "userId"
		| "groupId"
	>
>;
//#endregion
