import { AccountTable } from "@/src/db/schemas/Account";
import { IconSelect } from "../../icon/types/iconTypes";
import { Transaction } from "../../transaction/types/transactionTypes";

// #region Account DB types
export type AccountSelect = typeof AccountTable.$inferSelect;
export type AccountInsert = typeof AccountTable.$inferInsert;
export type AccountUpdate = Partial<Pick<AccountSelect, "name">>;
//#endregion

// #region Account data
export type AccountData = Omit<AccountSelect, "iconId"> & {
	icon: IconSelect;
};
//#endregion

// #region Account
export type Account = AccountData & {
	transactions: Transaction[];
};
//#endregion
