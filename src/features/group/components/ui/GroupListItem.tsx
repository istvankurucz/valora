import Divider from "@/src/components/ui/Divider";
import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { StyleSheet, View } from "react-native";
import { Group } from "../../types/groupTypes";

export type GroupListItemProps = ListItemProps & {
	group: Group;
};

const GroupListItem = ({ group, ...rest }: GroupListItemProps) => {
	return (
		<ListItem {...rest}>
			<ListItem.Icon icon={group.icon} />
			<ListItem.Main>
				<ListItem.Label>{group.name}</ListItem.Label>
				<View style={styles.infoContainer}>
					<ListItem.Info>
						{group.users.length} member{group.users.length > 1 ? "s" : ""}
					</ListItem.Info>
					<Divider />
					<ListItem.Info>
						{group.transactions.length} transaction{group.transactions.length > 1 ? "s" : ""}
					</ListItem.Info>
				</View>
			</ListItem.Main>
			<ListItem.More onPress={rest.onPress} />
		</ListItem>
	);
};

// Styles
const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
});

export default GroupListItem;
