import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { TransactionCategory } from "../../types/transactionCategoryTypes";

export type TransactionCategoryListItemProps = ListItemProps & {
	transactionCategory: TransactionCategory;
	sortable?: boolean;
};

const TransactionCategoryListItem = ({
	transactionCategory,
	sortable,
	...rest
}: TransactionCategoryListItemProps) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<ListItem {...rest}>
			<ListItem.Icon icon={transactionCategory.icon} />
			<ListItem.Main>
				<ListItem.Label style={styles.label}>{transactionCategory.name}</ListItem.Label>
				<ListItem.Info>
					{transactionCategory.transactions.length} transaction
					{transactionCategory.transactions.length > 1 ? "s" : ""}
				</ListItem.Info>
			</ListItem.Main>
			<ListItem.More
				IconComponent={
					sortable ? (
						<Ionicons name="swap-vertical-outline" size={16} color={iconColor} />
					) : undefined
				}
				onPress={rest.onPress}
			/>
		</ListItem>
	);
};

// Styles
const styles = StyleSheet.create({
	label: {
		textTransform: "capitalize",
	},
});

export default TransactionCategoryListItem;
