import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { TransactionTable } from "./Transaction";

// Schema
export const AccountTable = sqliteTable("account", {
	id,
	name: text("name").notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const AccountRelations = relations(AccountTable, ({ many }) => {
	return {
		transactions: many(TransactionTable),
	};
});
