import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, UUID_LENGTH } from "../schemaHelpers";
import { UserTable } from "./User";

// Schema
export const AdminPreferencesTable = sqliteTable("admin_preferences", {
	id,
	currency: text("currency", { length: 3 }).notNull(),
	notifications: integer("notifications", { mode: "boolean" }).notNull().default(true),
	userId: text("user_id", { length: UUID_LENGTH })
		.references(() => UserTable.id, { onDelete: "cascade" })
		.notNull(),
});

// Relations
export const AdminPrefrerencesRelations = relations(AdminPreferencesTable, ({ one }) => {
	return {
		user: one(UserTable, {
			fields: [AdminPreferencesTable.userId],
			references: [UserTable.id],
		}),
	};
});
