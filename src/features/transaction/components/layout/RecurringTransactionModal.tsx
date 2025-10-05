import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import useThemeColor from "@/src/hooks/useThemeColor";
import getNextTransactionDate from "@/src/utils/date/getNextTransactionDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { useRecurringTransaction } from "../../contexts/RecurringTransactionContext";
import useCreateTransaction from "../../hooks/useCreateTransaction";
import useUpdateTransaction from "../../hooks/useUpdateTransaction";

type Props = BottomModalProps;

const RecurringTransactionModal = forwardRef<BottomSheetModal, Props>(({ ...rest }, ref) => {
	// #region Hooks
	const { transaction, hideModal } = useRecurringTransaction();
	const { createTransaction, loading: loadingCreateTransaction } = useCreateTransaction();
	const { updateTransaction, loading: loadingUpdateTransaction } = useUpdateTransaction();
	const { setError } = useError();

	const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
	const deleteIconColor = useThemeColor({ variant: "danger", shade: 500 });
	//#endregion

	// #region Constants
	const loading = loadingCreateTransaction || loadingUpdateTransaction;
	//#endregion

	// #region Functions
	async function handleAddTransactionPress() {
		// Check transaction
		if (!transaction) return;

		// Get next transaction date
		const nextTransactionDate = getNextTransactionDate(
			new Date(transaction.timestamp),
			transaction.recurring
		);

		try {
			// Add transaction again
			await createTransaction({
				type: transaction.type,
				amount: transaction.amount,
				label: transaction.label,
				note: transaction.note,
				timestamp:
					nextTransactionDate > new Date()
						? new Date().toISOString()
						: nextTransactionDate.toISOString(),
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

			// Hide modal
			hideModal();
		} catch (err) {
			setError(err);
		}
	}

	async function handleRemoveTransactionPress() {
		// Check transaction
		if (!transaction) return;

		try {
			// Update current transaction
			await updateTransaction({ id: transaction.id, data: { recurring: null } });

			// Hide modal
			hideModal();
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<BottomModal {...rest} ref={ref}>
			<BottomModalTitle>Recurring transaction options</BottomModalTitle>

			{transaction?.recurringState !== "upcoming" && (
				<BottomModalListItem disabled={loading} onPress={handleAddTransactionPress}>
					<Ionicons name="add-outline" size={24} color={defaultIconColor} />
					<ThemedText>Add transaction again</ThemedText>
				</BottomModalListItem>
			)}
			<BottomModalListItem disabled={loading} onPress={handleRemoveTransactionPress}>
				<Ionicons name="remove-outline" size={24} color={deleteIconColor} />
				<ThemedText variant="danger" shade={500}>
					Remove transaction
				</ThemedText>
			</BottomModalListItem>
		</BottomModal>
	);
});

// Display name
RecurringTransactionModal.displayName = "RecurringTransactionModal";

export default RecurringTransactionModal;
