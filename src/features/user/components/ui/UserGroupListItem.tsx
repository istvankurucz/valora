import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { GroupData } from "@/src/features/group/types/groupTypes";

type Props = ListItemProps & {
	group: GroupData;
};

const UserGroupListItem = ({ group, ...rest }: Props) => {
	return (
		<ListItem {...rest}>
			<ListItem.Icon icon={group.icon} />
			<ListItem.Main>
				<ListItem.Label>{group.name}</ListItem.Label>
			</ListItem.Main>
			<ListItem.More onPress={rest.onPress} />
		</ListItem>
	);
};

export default UserGroupListItem;
