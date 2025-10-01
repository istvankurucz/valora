import ListContainer from "@/src/components/layout/ListContainer";
import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import RecurringTransactionListItem from "@/src/features/transaction/components/ui/RecurringTransactionListItem";
import { useRecurringTransaction } from "@/src/features/transaction/contexts/RecurringTransactionContext";
import useCreateTransaction from "@/src/features/transaction/hooks/useCreateTransaction";
import useGetRecurringTransactions from "@/src/features/transaction/hooks/useGetRecurringTransactions";
import useUpdateTransaction from "@/src/features/transaction/hooks/useUpdateTransaction";
import {
	Transaction,
	TransactionRecurringState,
} from "@/src/features/transaction/types/transactionTypes";
import groupRecurringTransactions from "@/src/features/transaction/utils/groupRecurringTransactions";
import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

const SettingsUpcomingRecurringPayments = () => {
	// #region Hooks
	const { transactions } = useGetRecurringTransactions();
	const { setTransaction, showModal } = useRecurringTransaction();
	const { createTransaction, loading: loadingCreateTransaction } = useCreateTransaction();
	const { updateTransaction, loading: loadingUpdateTransaction } = useUpdateTransaction();
	const { setError } = useError();
	//#endregion

	// #region Constants
	const groupedTransactions = useMemo(
		() => groupRecurringTransactions(transactions),
		[transactions]
	);
	const loading = loadingCreateTransaction || loadingUpdateTransaction;
	//#endregion

	// #region Functions
	function handleTransactionPress(
		transaction: Transaction,
		recurringState: TransactionRecurringState
	) {
		// Update state in context
		setTransaction({ ...transaction, recurringState });

		// Show modal
		showModal();
	}

	function handleAddAllTransactionsPress(transactions: Transaction[]) {
		transactions.forEach(async (transaction) => {
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
			} catch (error) {
				setError(error);
			}
		});
	}
	//#endregion

	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<ThemedText shade={500}>Click on the transaction to see more options.</ThemedText>

					<View>
						<Section.Header>
							<Section.Title>Due today</Section.Title>
							{groupedTransactions.today.length > 0 && (
								<TouchableOpacity
									hitSlop={4}
									disabled={loading}
									onPress={() => handleAddAllTransactionsPress(groupedTransactions.today)}
								>
									<Section.Header.Link>Add all</Section.Header.Link>
								</TouchableOpacity>
							)}
						</Section.Header>

						{groupedTransactions.today.length === 0 && (
							<Section.Empty
								icon="card-outline"
								text="No recurring transactions due today."
							/>
						)}
						<ListContainer>
							{groupedTransactions.today.map((transaction) => (
								<RecurringTransactionListItem
									key={transaction.id}
									transaction={transaction}
									state="today"
									onPress={() => handleTransactionPress(transaction, "today")}
								/>
							))}
						</ListContainer>
					</View>

					{groupedTransactions.past.length > 0 && (
						<View>
							<Section.Header>
								<Section.Title>Past due</Section.Title>
								{groupedTransactions.past.length > 0 && (
									<TouchableOpacity
										hitSlop={4}
										disabled={loading}
										onPress={() =>
											handleAddAllTransactionsPress(groupedTransactions.past)
										}
									>
										<Section.Header.Link>Add all</Section.Header.Link>
									</TouchableOpacity>
								)}
							</Section.Header>

							<ListContainer>
								{groupedTransactions.past.map((transaction) => (
									<RecurringTransactionListItem
										key={transaction.id}
										transaction={transaction}
										state="past"
										onPress={() => handleTransactionPress(transaction, "past")}
									/>
								))}
							</ListContainer>
						</View>
					)}

					{groupedTransactions.upcoming.length > 0 && (
						<View>
							<Section.Title>Upcoming</Section.Title>

							<ListContainer>
								{groupedTransactions.upcoming.map((transaction) => (
									<RecurringTransactionListItem
										key={transaction.id}
										transaction={transaction}
										state="upcoming"
										onPress={() => handleTransactionPress(transaction, "upcoming")}
									/>
								))}
							</ListContainer>
						</View>
					)}
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default SettingsUpcomingRecurringPayments;
