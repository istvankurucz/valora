import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import IconUnderlay from "@/src/components/ui/Underlay/IconUnderlay";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import UserIcon from "../../../user/components/ui/UserIcon";
import { User } from "../../../user/types/userTypes";
import { useGroup } from "../../contexts/GroupContext";
import useAddUsersToGroup from "../../hooks/useAddUsersToGroup";

type Props = ListItemProps & {
	user: User;
};

const SearchGroupUserListItem = ({ user, ...rest }: Props) => {
	// #region Hooks
	const { group } = useGroup();

	// #region Hooks
	const { addUsersToGroup, loading } = useAddUsersToGroup();
	const { setError } = useError();

	const backgroundColor = useThemeColor({ variant: "neutral", shade: 800 });
	const iconUnderlayColor = useThemeColor({ variant: "neutral", shade: 900 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 100 });
	//#endregion

	// #region Constants
	const isMember = user.groups.map((group) => group.id).includes(group?.id ?? "");
	//#endregion

	// #region Functions
	async function handleAddMemberPress() {
		// Check group
		if (!group) return;

		try {
			// Create group user
			await addUsersToGroup({ groupId: group.id, userIds: [user.id] });
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<ListItem {...rest}>
			<UserIcon />
			<ListItem.Main>
				<ListItem.Label>{user.name}</ListItem.Label>
				<ListItem.Info>
					Member of {user.groups.length} group{user.groups.length > 1 ? "s" : ""}
				</ListItem.Info>
			</ListItem.Main>
			{!isMember ? (
				<IconUnderlay
					disabled={loading}
					underlayColor={iconUnderlayColor}
					style={[styles.iconUnderlay, { backgroundColor }]}
					onPress={handleAddMemberPress}
				>
					<Ionicons name="add" size={20} color={iconColor} />
				</IconUnderlay>
			) : (
				<IconUnderlay style={styles.iconUnderlay} onPress={rest.onPress}>
					<Ionicons name="checkmark" size={20} />
				</IconUnderlay>
			)}
		</ListItem>
	);
};

// Styles
const styles = StyleSheet.create({
	iconUnderlay: {
		padding: 8,
	},
});

export default SearchGroupUserListItem;
