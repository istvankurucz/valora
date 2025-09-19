import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { IconSelect } from "../../icon/types/iconTypes";
import { Transaction } from "../../transaction/types/transactionTypes";

// #region Transaction category DB types
export type TransactionCategorySelect = typeof TransactionCategoryTable.$inferSelect;
export type TransactionCategoryInsert = typeof TransactionCategoryTable.$inferInsert;
export type TransactionCategoryUpdate = Partial<
	Omit<TransactionCategorySelect, "id" | "iconId" | "updatedAt" | "createdAt">
>;
//#endregion

// #region Transaction category data
export type TransactionCategoryData = Omit<TransactionCategorySelect, "iconId"> & {
	icon: IconSelect;
};
//#endregion

// #region Transaction category
export type TransactionCategory = TransactionCategoryData & {
	transactions: Transaction[];
};
//#endregion
