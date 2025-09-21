import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { forwardRef } from "react";
import { useAccount } from "../../contexts/AccountContext";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import useGetDefaultAccount from "../../hooks/useGetDefaultAccount";
import useMoveAccountTransactionsToDefaultAccount from "../../hooks/useMoveAccountTransactionsToDefaultAccount";

type Props = BottomModalProps;

const AccountDeleteModal = forwardRef<BottomSheetModal, Props>(
	({ stackBehavior, ...rest }, ref) => {
		// #region Hooks
		const { account } = useAccount();
		const { account: defaultAccount } = useGetDefaultAccount();
		const { moveAccountTransactionsToDefaultAccount, loading: loadingMovingTransactions } =
			useMoveAccountTransactionsToDefaultAccount();
		const { deleteAccount, loading: loadingDeleteAccount } = useDeleteAccount();
		const { setFeedback } = useFeedback();
		const { setError } = useError();
		const router = useRouter();
		//#endregion

		// #region Constants
		const loading = loadingMovingTransactions || loadingDeleteAccount;
		//#endregion

		// #region Functions
		async function handleDeletePress() {
			// Check accounts
			if (!account || !defaultAccount) return;

			try {
				// Delete account
				await moveAccountTransactionsToDefaultAccount({
					transactionIds: account.transactions.map((transaction) => transaction.id),
					defaultAccountId: defaultAccount.id,
				});
				await deleteAccount(account.id);

				// Show feedback
				setFeedback({
					type: "success",
					message: "Account deleted.",
				});

				// Navigate
				router.dismissTo("/accounts");
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
				<BottomModalTitle>Delete account</BottomModalTitle>

				<BottomModalTextContainer>
					<ThemedText shade={600}>Are you sure you want to delete the account?</ThemedText>
					<ThemedText shade={600}>
						All of its transactions will be moved to your default account.
					</ThemedText>
				</BottomModalTextContainer>

				<Button
					variant="danger"
					title="Delete account"
					loading={loading}
					onPress={handleDeletePress}
				/>
			</BottomModal>
		);
	}
);

// Display name
AccountDeleteModal.displayName = "AccountDeleteModal";

export default AccountDeleteModal;
