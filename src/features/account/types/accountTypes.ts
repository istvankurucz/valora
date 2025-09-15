import { AccountTable } from "@/src/db/schemas/Account";

// #region DB types
export type AccountSelect = typeof AccountTable.$inferSelect;
export type AccountInsert = typeof AccountTable.$inferInsert;
export type AccountUpdate = Partial<Pick<AccountSelect, "name">>;
//#endregion
