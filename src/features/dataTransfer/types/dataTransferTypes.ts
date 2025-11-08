import { AccountSelect } from "../../account/types/accountTypes";
import { GroupSelect, GroupUserSelect } from "../../group/types/groupTypes";
import { IconSelect } from "../../icon/types/iconTypes";
import { TransactionSelect } from "../../transaction/types/transactionTypes";
import { TransactionCategorySelect } from "../../transactionCategory/types/transactionCategoryTypes";
import { UserSelect } from "../../user/types/userTypes";

// #region Data transfer
export type DataTransferData = {
	users: UserSelect[];
	accounts: AccountSelect[];
	transactions: TransactionSelect[];
	transactionCategories: TransactionCategorySelect[];
	groups: GroupSelect[];
	groupUsers: GroupUserSelect[];
	icons: IconSelect[];
};

export type DataTransferMetadata = {
	exportedAt: string;
};

export type DataTransfer = {
	data: DataTransferData;
	metadata: DataTransferMetadata;
};
//#endregion
