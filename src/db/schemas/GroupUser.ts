import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ISO_DATE_LENGTH, UUID_LENGTH } from "../schemaHelpers";
import { GroupTable } from "./Group";
import { UserTable } from "./User";

// Schema
export const GroupUserTable = sqliteTable(
	"group_user",
	{
		groupId: text("group_id", { length: UUID_LENGTH })
			.references(() => GroupTable.id, { onDelete: "cascade" })
			.notNull(),
		userId: text("user_id", { length: UUID_LENGTH })
			.references(() => UserTable.id, { onDelete: "cascade" })
			.notNull(),
		addedAt: text("added_at", { length: ISO_DATE_LENGTH })
			.notNull()
			.$default(() => new Date().toISOString()),
	},
	(table) => [primaryKey({ columns: [table.groupId, table.userId] })]
);

// Relations
export const GroupUserRelations = relations(GroupUserTable, ({ one }) => {
	return {
		group: one(GroupTable, {
			fields: [GroupUserTable.groupId],
			references: [GroupTable.id],
		}),
		user: one(UserTable, {
			fields: [GroupUserTable.userId],
			references: [UserTable.id],
		}),
	};
});
