import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt, UUID_LENGTH } from "../schemaHelpers";
import { IconTable } from "./Icon";
import { TransactionTable } from "./Transaction";

// Schema
export const AccountTable = sqliteTable("account", {
	id,
	name: text("name").notNull(),
	iconId: text("icon_id", { length: UUID_LENGTH })
		.references(() => IconTable.id)
		.notNull(),
	default: integer("default", { mode: "boolean" }).notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const AccountRelations = relations(AccountTable, ({ one, many }) => {
	return {
		icon: one(IconTable, {
			fields: [AccountTable.iconId],
			references: [IconTable.id],
		}),
		transactions: many(TransactionTable),
	};
});
