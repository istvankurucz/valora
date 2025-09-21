import { CurrencyCode } from "@/src/constants/currencies";
import { UserTable } from "@/src/db/schemas/User";

// #region User DB types
export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferInsert;
export type UserUpdate = Partial<Pick<UserSelect, "name">>;
//#endregion

// #region Admin
export type AdminUser = Omit<UserSelect, "currency"> & {
	currency: CurrencyCode;
};
export type AdminUserInsert = Omit<UserInsert, "admin" | "currency"> & {
	currency: string;
};
export type AdminUserUpdate = Partial<Pick<UserSelect, "name" | "currency">>;
//#endregion

// #region User data
export type UserData = Omit<UserSelect, "currency" | "updatedAt" | "createdAt">;
//#endregion
