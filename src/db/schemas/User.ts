import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { GroupUserTable } from "./GroupUser";
import { TransactionTable } from "./Transaction";

// Schema
export const UserTable = sqliteTable("user", {
	id,
	name: text("name").notNull(),
	admin: integer("admin", { mode: "boolean" }).notNull(),
	currency: text("currency", { length: 3 }),
	updatedAt,
	createdAt,
});

// Relations
export const UserRelations = relations(UserTable, ({ many }) => {
	return {
		transactions: many(TransactionTable),
		groups: many(GroupUserTable),
	};
});
