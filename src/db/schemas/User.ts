import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { AdminPreferencesTable } from "./AdminPreferences";
import { GroupUserTable } from "./GroupUser";
import { TransactionTable } from "./Transaction";

// Schema
export const UserTable = sqliteTable("user", {
	id,
	name: text("name").notNull(),
	admin: integer("admin", { mode: "boolean" }).notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const UserRelations = relations(UserTable, ({ one, many }) => {
	return {
		preferences: one(AdminPreferencesTable),
		transactions: many(TransactionTable),
		groups: many(GroupUserTable),
	};
});
