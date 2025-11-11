import { CurrencyCode } from "@/src/constants/currencies";
import { AdminPreferencesTable } from "@/src/db/schemas/AdminPreferences";
import { UserTable } from "@/src/db/schemas/User";
import { GroupData } from "../../group/types/groupTypes";

// #region User DB types
export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferInsert;
export type UserUpdate = Partial<Pick<UserSelect, "name">>;
//#endregion

// #region Admin preferences DB type
export type AdminPreferencesSelect = typeof AdminPreferencesTable.$inferSelect;
export type AdminPreferencesInsert = typeof AdminPreferencesTable.$inferInsert;
export type AdminPreferencesUpdate = Partial<
	Pick<AdminPreferencesSelect, "currency" | "notifications">
>;
//#endregion

// #region Admin preferences
export type AdminPreferences = Pick<AdminPreferencesSelect, "notifications"> & {
	currency: CurrencyCode;
};
//#endregion

// #region Admin
export type AdminUser = Omit<UserSelect, "admin"> & {
	admin: true;
	preferences: AdminPreferences;
};
//#endregion

// #region User data
export type UserData = Omit<UserSelect, "updatedAt" | "createdAt">;
//#endregion

// #region User
export type User = UserData & {
	groups: GroupData[];
};
//#endregion
