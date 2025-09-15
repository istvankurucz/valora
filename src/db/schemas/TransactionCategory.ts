import { TRANSACTION_TYPE_OPTIONS } from "@/src/features/transaction/constants/transactionTypeOptions";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "../schemaHelpers";
import { TransactionTable } from "./Transaction";

// Schema
export const TransactionCategoryTable = sqliteTable("transaction_category", {
	id,
	type: text("type", { enum: TRANSACTION_TYPE_OPTIONS }).notNull(),
	name: text("name").notNull(),
	icon: text("icon").notNull(),
	foregroundColor: text("foreground_color").notNull(),
	backgroundColor: text("background_color").notNull(),
});

// Relations
export const TransactionCategoryRelations = relations(TransactionCategoryTable, ({ many }) => {
	return {
		transactions: many(TransactionTable),
	};
});
