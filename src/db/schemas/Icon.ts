import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { HEX_COLOR_LENGTH, id } from "../schemaHelpers";
import { AccountTable } from "./Account";
import { GroupTable } from "./Group";
import { TransactionCategoryTable } from "./TransactionCategory";

// Schema
export const IconTable = sqliteTable("icon", {
	id,
	name: text("name").notNull(),
	foregroundColor: text("foreground_color", { length: HEX_COLOR_LENGTH }).notNull(),
	backgroundColor: text("background_color", { length: HEX_COLOR_LENGTH }).notNull(),
});

// Relations
export const IconRelations = relations(IconTable, ({ one }) => {
	return {
		account: one(AccountTable),
		transactionCategory: one(TransactionCategoryTable),
		group: one(GroupTable),
	};
});
