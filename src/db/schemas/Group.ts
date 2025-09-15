import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { GroupUserTable } from "./GroupUser";
import { TransactionTable } from "./Transaction";

// Schema
export const GroupTable = sqliteTable("group", {
	id,
	name: text("name").notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const GroupRelations = relations(GroupTable, ({ many }) => {
	return {
		transactions: many(TransactionTable),
		users: many(GroupUserTable),
	};
});
