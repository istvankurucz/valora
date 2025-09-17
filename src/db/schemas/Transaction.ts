import { TRANSACTION_RECURRING_OPTIONS } from "@/src/features/transaction/constants/transactionRecurringOptions";
import { TRANSACTION_TYPE_OPTIONS } from "@/src/features/transaction/constants/transactionTypeOptions";
import { relations } from "drizzle-orm";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, ISO_DATE_LENGTH, UUID_LENGTH } from "../schemaHelpers";
import { AccountTable } from "./Account";
import { GroupTable } from "./Group";
import { TransactionCategoryTable } from "./TransactionCategory";
import { UserTable } from "./User";

// Schema
export const TransactionTable = sqliteTable("transaction", {
	id,
	type: text("type", { enum: TRANSACTION_TYPE_OPTIONS }).notNull(),
	label: text("label").notNull(),
	note: text("note"),
	categoryId: text("category_id", { length: UUID_LENGTH })
		.references(() => TransactionCategoryTable.id)
		.notNull(),
	timestamp: text("timestamp", { length: ISO_DATE_LENGTH }).notNull(),
	amount: real("amount").notNull(),
	currency: text("currency", { length: 3 }).notNull(),
	recurring: text("recurring", { enum: TRANSACTION_RECURRING_OPTIONS }),
	accountId: text("account_id", { length: UUID_LENGTH }).references(() => AccountTable.id),
	userId: text("user_id", { length: UUID_LENGTH })
		.references(() => UserTable.id)
		.notNull(),
	groupId: text("group_id", { length: UUID_LENGTH }).references(() => GroupTable.id),
});

// Relations
export const TransactionRelations = relations(TransactionTable, ({ one }) => {
	return {
		category: one(TransactionCategoryTable, {
			fields: [TransactionTable.categoryId],
			references: [TransactionCategoryTable.id],
		}),
		account: one(AccountTable, {
			fields: [TransactionTable.accountId],
			references: [AccountTable.id],
		}),
		user: one(UserTable, {
			fields: [TransactionTable.userId],
			references: [UserTable.id],
		}),
		group: one(GroupTable, {
			fields: [TransactionTable.groupId],
			references: [GroupTable.id],
		}),
	};
});
