import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import UserIcon from "@/src/features/user/components/ui/UserIcon";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { useGroup } from "../../contexts/GroupContext";
import { GroupUser } from "../../types/groupTypes";

type Props = ListItemProps & {
	user: GroupUser;
};

const GroupUserListItem = ({ user, ...rest }: Props) => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { group } = useGroup();
	//#endregion

	// #region Constants
	const userTransactions = (group?.transactions ?? []).filter(
		(transaction) => transaction.user.id === user.id
	);
	//#endregion

	return (
		<ListItem {...rest}>
			<UserIcon />
			<ListItem.Main>
				<ListItem.Label>
					{user.name}
					{user.id === admin?.id ? " (Me)" : ""}
				</ListItem.Label>
				<ListItem.Info>
					{userTransactions.length} transaction{userTransactions.length > 1 ? "s" : ""}
				</ListItem.Info>
			</ListItem.Main>
			<ListItem.More />
		</ListItem>
	);
};

export default GroupUserListItem;
