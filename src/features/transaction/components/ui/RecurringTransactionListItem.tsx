import Button from "@/src/components/ui/Button";
import ListItem, { ListItemProps } from "@/src/components/ui/ListItem/ListItem";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import formatRecurringDate from "@/src/utils/format/formatRecurringDate";
import { StyleSheet, View } from "react-native";
import useCreateTransaction from "../../hooks/useCreateTransaction";
import useUpdateTransaction from "../../hooks/useUpdateTransaction";
import { Transaction, TransactionRecurringState } from "../../types/transactionTypes";
import TransactionAmount from "./TransactionAmount";
import TransactionRecurringLabel from "./TransactionRecurringLabel";

type Props = ListItemProps & {
	transaction: Transaction;
	state: TransactionRecurringState;
};

const RecurringTransactionListItem = ({ transaction, state, ...rest }: Props) => {
	// #region Hooks
	const { createTransaction, loading: loadingCreateTransaction } = useCreateTransaction();
	const { updateTransaction, loading: loadingUpdateTransaction } = useUpdateTransaction();
	const { setError } = useError();
	//#endregion

	// #region Constants
	const showAddButton = state !== "upcoming";
	const loading = loadingCreateTransaction || loadingUpdateTransaction;
	//#endregion

	// #region Functions
	async function handleAddTransactionPress() {
		try {
			// Add transaction again
			await createTransaction({
				type: transaction.type,
				amount: transaction.amount,
				label: transaction.label,
				note: transaction.note,
				timestamp: getNextTransactionDate(
					new Date(transaction.timestamp),
					transaction.recurring!
				).toISOString(),
				categoryId: transaction.category.id,
				accountId: transaction.account?.id ?? null,
				groupId: transaction.group?.id ?? null,
				userId: transaction.user.id,
				recurring: transaction.recurring,
			});

			// Update current transaction
			await updateTransaction({
				id: transaction.id,
				data: { nextTransactionAddedAt: new Date().toISOString() },
			});
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<ListItem {...rest}>
			<View>
				<ListItem.Icon icon={transaction.category.icon} />
				{transaction.recurring && <TransactionRecurringLabel />}
			</View>

			<ListItem.Main>
				<ListItem.Label>{transaction.label}</ListItem.Label>
				<ListItem.Info>
					{formatRecurringDate(
						getNextTransactionDate(new Date(transaction.timestamp), transaction.recurring!)
					)}
				</ListItem.Info>
			</ListItem.Main>

			<View style={styles.right}>
				<TransactionAmount amount={transaction.amount} transactionType={transaction.type} />
				{showAddButton && (
					<Button
						title="Add"
						loading={loading}
						style={styles.button}
						titleStyle={styles.buttonTitle}
						onPress={handleAddTransactionPress}
					/>
				)}
			</View>
		</ListItem>
	);
};

// Styles
const styles = StyleSheet.create({
	right: {
		gap: 4,
		alignItems: "flex-end",
	},
	button: {
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	buttonTitle: {
		fontSize: FONT_SIZE[400],
	},
});

export default RecurringTransactionListItem;
