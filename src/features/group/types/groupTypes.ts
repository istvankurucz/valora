import { GroupTable } from "@/src/db/schemas/Group";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { IconSelect } from "../../icon/types/iconTypes";
import { Transaction } from "../../transaction/types/transactionTypes";
import { UserData } from "../../user/types/userTypes";

// #region Group DB types
export type GroupSelect = typeof GroupTable.$inferSelect;
export type GroupInsert = typeof GroupTable.$inferInsert;
export type GroupUpdate = Partial<Pick<GroupSelect, "name">>;
//#endregion

// #region Group data
export type GroupData = Omit<GroupSelect, "iconId"> & {
	icon: IconSelect;
};
//#endregion

// #region Group
export type Group = GroupData & {
	transactions: Transaction[];
	users: GroupUser[];
};
//#endregion

// #region Group user DB types
export type GroupUserSelect = typeof GroupUserTable.$inferSelect;
export type GroupUserInsert = typeof GroupUserTable.$inferInsert;
//#endregion

// #region Group user
export type GroupUser = Omit<GroupUserSelect, "groupId" | "userId"> & UserData;
export type GroupUserWithTransactions = GroupUser & { transactions: Transaction[] };
//#endregion
