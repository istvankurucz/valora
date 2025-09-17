import { GroupTable } from "@/src/db/schemas/Group";
import { GroupUserTable } from "@/src/db/schemas/GroupUser";
import { IconSelect } from "../../icon/types/iconTypes";

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

// #region Group user DB types
export type GroupUserSelect = typeof GroupUserTable.$inferSelect;
export type GroupUserInsert = typeof GroupUserTable.$inferInsert;
//#endregion
