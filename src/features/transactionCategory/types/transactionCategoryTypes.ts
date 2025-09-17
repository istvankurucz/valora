import { TransactionCategoryTable } from "@/src/db/schemas/TransactionCategory";
import { IconSelect } from "../../icon/types/iconTypes";

// #region Transaction category DB types
export type TransactionCategorySelect = typeof TransactionCategoryTable.$inferSelect;
export type TransactionCategoryInsert = typeof TransactionCategoryTable.$inferInsert;
export type TransactionCategoryUpdate = Partial<Omit<TransactionCategorySelect, "id">>;
//#endregion

// #region Transaction category
export type TransactionCategory = Omit<TransactionCategorySelect, "iconId"> & {
	icon: IconSelect;
};
//#endregion
