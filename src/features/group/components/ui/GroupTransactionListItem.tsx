import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import TransactionAmount from "@/src/features/transaction/components/ui/TransactionAmount";
import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import formatRelativeDate from "@/src/utils/format/formatRelativeDate";
import { View } from "react-native";

type Props = ListItemProps & {
	transaction: Transaction;
};

const GroupTransactionListItem = ({ transaction, ...rest }: Props) => {
	// #region Hooks
	const { admin } = useAdminUser();
	//#endregion

	return (
		<ListItem {...rest}>
			<ListItem.Icon icon={transaction.category.icon} />
			<ListItem.Main>
				<ListItem.Label>{transaction.label}</ListItem.Label>
				<View>
					<ListItem.Info>
						{transaction.user.name}
						{transaction.user.id === admin?.id ? " (Me)" : ""}
					</ListItem.Info>
					<ListItem.Info>{formatRelativeDate(new Date(transaction.timestamp))}</ListItem.Info>
				</View>
			</ListItem.Main>
			<TransactionAmount amount={transaction.amount} transactionType={transaction.type} />
		</ListItem>
	);
};

export default GroupTransactionListItem;
