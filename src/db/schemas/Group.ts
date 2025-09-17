import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt, UUID_LENGTH } from "../schemaHelpers";
import { GroupUserTable } from "./GroupUser";
import { IconTable } from "./Icon";
import { TransactionTable } from "./Transaction";

// Schema
export const GroupTable = sqliteTable("group", {
	id,
	name: text("name").notNull(),
	iconId: text("icon_id", { length: UUID_LENGTH })
		.references(() => IconTable.id)
		.notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const GroupRelations = relations(GroupTable, ({ one, many }) => {
	return {
		icon: one(IconTable, {
			fields: [GroupTable.iconId],
			references: [IconTable.id],
		}),
		transactions: many(TransactionTable),
		users: many(GroupUserTable),
	};
});
