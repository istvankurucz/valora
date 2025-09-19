import { TRANSACTION_TYPE_OPTIONS } from "@/src/features/transaction/constants/transactionTypeOptions";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, updatedAt, UUID_LENGTH } from "../schemaHelpers";
import { IconTable } from "./Icon";
import { TransactionTable } from "./Transaction";

// Schema
export const TransactionCategoryTable = sqliteTable("transaction_category", {
	id,
	type: text("type", { enum: TRANSACTION_TYPE_OPTIONS }).notNull(),
	name: text("name").notNull(),
	iconId: text("icon_id", { length: UUID_LENGTH })
		.references(() => IconTable.id)
		.notNull(),
	updatedAt,
	createdAt,
});

// Relations
export const TransactionCategoryRelations = relations(TransactionCategoryTable, ({ one, many }) => {
	return {
		icon: one(IconTable, {
			fields: [TransactionCategoryTable.iconId],
			references: [IconTable.id],
		}),
		transactions: many(TransactionTable),
	};
});
