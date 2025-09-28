import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { Account } from "../../types/accountTypes";

export type AccountListItemProps = ListItemProps & {
	account: Account;
};

const AccountListItem = ({ account, ...rest }: AccountListItemProps) => {
	// #region Hooks
	const starColor = useThemeColor({ variant: "warning", shade: 400 });
	//#endregion

	return (
		<ListItem {...rest}>
			<View>
				<ListItem.Icon icon={account.icon} />
				{account.default && (
					<ThemedView variant="warning" shade={100} style={styles.star}>
						<Ionicons name="star" size={12} color={starColor} />
					</ThemedView>
				)}
			</View>
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

// Styles
const styles = StyleSheet.create({
	star: {
		borderRadius: BORDER_RADIUS[400],
		padding: 4,
		position: "absolute",
		top: -6,
		left: -6,
	},
});

export default AccountListItem;
