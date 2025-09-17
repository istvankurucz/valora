import { TransactionTable } from "@/src/db/schemas/Transaction";
import { AccountData } from "../../account/types/accountTypes";
import { GroupData } from "../../group/types/groupTypes";
import { TransactionCategory } from "../../transactionCategory/types/transactionCategoryTypes";
import { UserData } from "../../user/types/userTypes";

// #region Transaction DB types
export type TransactionSelect = typeof TransactionTable.$inferSelect;
export type TransactionInsert = typeof TransactionTable.$inferInsert;
export type TransactionUpdate = Partial<
	Pick<
		TransactionSelect,
		| "type"
		| "label"
		| "note"
		| "categoryId"
		| "timestamp"
		| "amount"
		| "currency"
		| "recurring"
		| "accountId"
		| "userId"
		| "groupId"
	>
>;
//#endregion

// #region Transaction
export type Transaction = Omit<
	TransactionSelect,
	"categoryId" | "userId" | "accountId" | "groupId"
> & {
	category: TransactionCategory;
	user: UserData;
	account: AccountData | null;
	group: GroupData | null;
};
//#endregion
