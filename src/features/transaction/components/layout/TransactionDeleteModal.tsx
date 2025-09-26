import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { usePathname, useRouter } from "expo-router";
import { forwardRef } from "react";
import { useTransaction } from "../../contexts/TransactionContext";
import useDeleteTransaction from "../../hooks/useDeleteTransaction";

type Props = BottomModalProps;

const TransactionDeleteModal = forwardRef<BottomSheetModal, Props>(
	({ stackBehavior, ...rest }, ref) => {
		// #region Hooks
		const { transaction } = useTransaction();
		const { deleteTransaction, loading } = useDeleteTransaction();
		const { setFeedback } = useFeedback();
		const { setError } = useError();
		const pathname = usePathname();
		const router = useRouter();
		//#endregion

		//#region Functions
		async function handleDeletePress() {
			// Check transaction
			if (!transaction) return;

			try {
				// Delete transaction
				await deleteTransaction(transaction.id);

				// Show feedback
				setFeedback({
					type: "success",
					message: "Transaction deleted.",
				});

				// Navigate
				if (pathname.includes("/accounts")) {
					router.dismissTo(`/accounts/${transaction.account?.id}/transactions`);
				} else if (pathname.includes("/groups")) {
					router.dismissTo(`/groups/${transaction.group?.id}/transactions`);
				} else if (pathname.includes("/transaction-categories")) {
					router.dismissTo(
						`/settings/transaction-categories/${transaction.category.id}/transactions`
					);
				} else if (pathname.includes("/home/transactions")) {
					router.dismissTo("/home/transactions");
				} else {
					router.replace("/");
				}
			} catch (err) {
				setError(err);
			}
		}
		//#endregion

		return (
			<BottomModal
				snapPoints={[300]}
				stackBehavior={stackBehavior ?? "replace"}
				{...rest}
				ref={ref}
			>
				<BottomModalTitle>Delete transaction</BottomModalTitle>

				<BottomModalTextContainer>
					<ThemedText shade={600}>Are you sure you want to delete the transaction?</ThemedText>
				</BottomModalTextContainer>

				<Button
					variant="danger"
					title="Delete transaction"
					loading={loading}
					onPress={handleDeletePress}
				/>
			</BottomModal>
		);
	}
);

// Display name
TransactionDeleteModal.displayName = "TransactionDeleteModal";

export default TransactionDeleteModal;
