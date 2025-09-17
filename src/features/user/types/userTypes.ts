import { UserTable } from "@/src/db/schemas/User";

// #region User DB types
export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferInsert;
export type AdminUserInsert = Omit<UserInsert, "admin">;
export type UserUpdate = Partial<Pick<UserSelect, "name">>;
//#endregion

// #region User data
export type UserData = Omit<UserSelect, "updatedAt" | "createdAt">;
//#endregion
