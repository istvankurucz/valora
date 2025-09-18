import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { Account } from "../../types/accountTypes";

export type AccountListItemProps = ListItemProps & {
	account: Account;
};

const AccountListItem = ({ account, ...rest }: AccountListItemProps) => {
	return (
		<ListItem {...rest}>
			<ListItem.Icon icon={account.icon} />
			<ListItem.Main>
				<ListItem.Label>{account.name}</ListItem.Label>
				<ListItem.Info>
					{account.transactions.length} transaction{account.transactions.length > 1 ? "s" : ""}
				</ListItem.Info>
			</ListItem.Main>
			<ListItem.More onPress={rest.onPress} />
		</ListItem>
	);
};

export default AccountListItem;
