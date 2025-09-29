import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import TransactionAmount from "@/src/features/transaction/components/ui/TransactionAmount";
import TransactionRecurringLabel from "@/src/features/transaction/components/ui/TransactionRecurringLabel";
import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import formatRelativeDate from "@/src/utils/format/formatRelativeDate";
import { View } from "react-native";

type Props = ListItemProps & {
	transaction: Transaction;
};

const AdminTransactionListItem = ({ transaction, ...rest }: Props) => {
	return (
		<ListItem {...rest}>
			<View>
				<ListItem.Icon icon={transaction.category.icon} />
				{transaction.recurring && <TransactionRecurringLabel />}
			</View>
			<ListItem.Main>
				<ListItem.Label>{transaction.label}</ListItem.Label>
				<View>
					<ListItem.Info>{formatRelativeDate(new Date(transaction.timestamp))}</ListItem.Info>
					{transaction.account && <ListItem.Info>{transaction.account.name}</ListItem.Info>}
				</View>
			</ListItem.Main>
			<TransactionAmount amount={transaction.amount} transactionType={transaction.type} />
		</ListItem>
	);
};

export default AdminTransactionListItem;
