import { IconTable } from "@/src/db/schemas/Icon";

// #region Icon DB types
export type IconSelect = typeof IconTable.$inferSelect;
export type IconInsert = typeof IconTable.$inferInsert;
export type IconUpdate = Partial<Pick<IconSelect, "name" | "foregroundColor" | "backgroundColor">>;
//#endregion

// #region Icon
export type Icon = Omit<IconSelect, "id">;
//#endregion
