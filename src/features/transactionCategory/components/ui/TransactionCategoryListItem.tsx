import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { StyleSheet } from "react-native";
import { TransactionCategory } from "../../types/transactionCategoryTypes";

export type TransactionCategoryListItemProps = ListItemProps & {
	transactionCategory: TransactionCategory;
};

const TransactionCategoryListItem = ({
	transactionCategory,
	...rest
}: TransactionCategoryListItemProps) => {
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
			<ListItem.More onPress={rest.onPress} />
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
