import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { User } from "../../types/userTypes";
import UserIcon from "./UserIcon";

type Props = ListItemProps & {
	user: User;
};

const UserListItem = ({ user, ...rest }: Props) => {
	return (
		<ListItem {...rest}>
			<UserIcon />
			<ListItem.Main>
				<ListItem.Label>{user.name}</ListItem.Label>
				<ListItem.Info>
					Member of {user.groups.length} group{user.groups.length > 1 ? "s" : ""}
				</ListItem.Info>
			</ListItem.Main>
			<ListItem.More onPress={rest.onPress} />
		</ListItem>
	);
};

export default UserListItem;
