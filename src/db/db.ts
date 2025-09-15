import * as Account from "@/src/db/schemas/Account";
import * as Group from "@/src/db/schemas/Group";
import * as GroupUser from "@/src/db/schemas/GroupUser";
import * as Transaction from "@/src/db/schemas/Transaction";
import * as TransactionCategory from "@/src/db/schemas/TransactionCategory";
import * as User from "@/src/db/schemas/User";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// SQLite client
export const sqliteClient = SQLite.openDatabaseSync("expenseTracker.db");

// Schema
const schema = {
	...User,
	...Account,
	...Transaction,
	...TransactionCategory,
	...Group,
	...GroupUser,
};

// DB client
export const db = drizzle(sqliteClient, { schema });
