import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { forwardRef } from "react";
import { useGroup } from "../../contexts/GroupContext";
import useDeleteGroup from "../../hooks/useDeleteGroup";
import useDeleteGroupMemberTransactions from "../../hooks/useDeleteGroupMemberTransactions";

type Props = BottomModalProps;

const GroupDeleteModal = forwardRef<BottomSheetModal, Props>(({ stackBehavior, ...rest }, ref) => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { group } = useGroup();
	const { deleteGroupMemberTransactions, loading: loadingDeleteTransactions } =
		useDeleteGroupMemberTransactions();
	const { deleteGroup, loading: loadingDeleteGroup } = useDeleteGroup();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingDeleteTransactions || loadingDeleteGroup;
	//#endregion

	// #region Functions
	async function handleDeleteGroupPress() {
		// Check admin and group
		if (!admin || !group) return;

		try {
			// Delete group
			await deleteGroupMemberTransactions({ groupId: group.id, adminId: admin.id });
			await deleteGroup(group.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Group deleted.",
			});

			// Navigate
			router.dismissTo("/groups");
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
			<BottomModalTitle>Delete group</BottomModalTitle>

			<BottomModalTextContainer>
				<ThemedText shade={600}>Are you sure you want to delete the group?</ThemedText>
				<ThemedText shade={600}>
					Transactions of other group members will be deleted (excluding yours).
				</ThemedText>
			</BottomModalTextContainer>

			<Button
				variant="danger"
				title="Delete group"
				loading={loading}
				onPress={handleDeleteGroupPress}
			/>
		</BottomModal>
	);
});

// Display name
GroupDeleteModal.displayName = "GroupDeleteModal";

export default GroupDeleteModal;
