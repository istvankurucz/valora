import * as Account from "@/src/db/schemas/Account";
import * as AdminPreferences from "@/src/db/schemas/AdminPreferences";
import * as Group from "@/src/db/schemas/Group";
import * as GroupUser from "@/src/db/schemas/GroupUser";
import * as Icon from "@/src/db/schemas/Icon";
import * as Transaction from "@/src/db/schemas/Transaction";
import * as TransactionCategory from "@/src/db/schemas/TransactionCategory";
import * as User from "@/src/db/schemas/User";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// SQLite client
export const sqliteClient = SQLite.openDatabaseSync("expenseTracker.db");
sqliteClient.execSync("PRAGMA foreign_keys = ON;");

// Schema
const schema = {
	...User,
	...AdminPreferences,
	...Account,
	...Transaction,
	...TransactionCategory,
	...Group,
	...GroupUser,
	...Icon,
};

// DB client
export const db = drizzle(sqliteClient, { schema });
