import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";

// #region DB types
export type TransactionCategorySelect = typeof TransactionCategoryTable.$inferSelect;
export type TransactionCategoryInsert = typeof TransactionCategoryTable.$inferInsert;
export type TransactionCategoryUpdate = Partial<
	Pick<TransactionCategorySelect, "type" | "name" | "icon" | "foregroundColor" | "backgroundColor">
>;
//#endregion
