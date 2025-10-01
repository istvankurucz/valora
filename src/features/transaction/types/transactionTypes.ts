import { TransactionTable } from "@/src/db/schemas/Transaction";
import { AccountData } from "../../account/types/accountTypes";
import { GroupData } from "../../group/types/groupTypes";
import { TransactionCategoryData } from "../../transactionCategory/types/transactionCategoryTypes";
import { UserData } from "../../user/types/userTypes";

// #region Transaction DB types
export type TransactionSelect = typeof TransactionTable.$inferSelect;
export type TransactionInsert = typeof TransactionTable.$inferInsert;
export type TransactionUpdate = Partial<Omit<TransactionSelect, "id">>;
//#endregion

// #region Transaction
export type Transaction = Omit<
	TransactionSelect,
	"categoryId" | "userId" | "accountId" | "groupId"
> & {
	category: TransactionCategoryData;
	user: UserData;
	account: AccountData | null;
	group: GroupData | null;
};
//#endregion

// #region Transaction recurring state
export type TransactionRecurringState = "today" | "past" | "upcoming";
//#endregion

// #region Transactions sort
export type TransactionSortProperty = "timestamp" | "amount";
//#endregion
