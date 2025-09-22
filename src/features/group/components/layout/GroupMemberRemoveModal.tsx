import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import useDeleteTransactionsByUserId from "@/src/features/transaction/hooks/useDeleteTransactionsByUserIdAndGroupId";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { forwardRef } from "react";
import { useGroup } from "../../contexts/GroupContext";
import { useGroupMember } from "../../contexts/GroupMemberContext";
import useDeleteGroupUser from "../../hooks/useDeleteGroupUser";

type Props = BottomModalProps;

const GroupMemberRemoveModal = forwardRef<BottomSheetModal, Props>(
	({ stackBehavior, ...rest }, ref) => {
		//#region Hooks
		const { group } = useGroup();
		const { member } = useGroupMember();
		const { deleteGroupUser, loading: loadingDeleteGroupUser } = useDeleteGroupUser();
		const { deleteTransactionsByUserIdAndGroupId, loading: loadingDeleteTransactions } =
			useDeleteTransactionsByUserId();
		const { setFeedback } = useFeedback();
		const { setError } = useError();
		const router = useRouter();
		//#endregion

		// #region Constants
		const loading = loadingDeleteTransactions || loadingDeleteGroupUser;
		//#endregion

		// #region Functions
		async function handleDeleteGroupMemberPress() {
			// Check group and member
			if (!group || !member) return;

			try {
				// Delete group-user
				await deleteGroupUser({ userId: member.id, groupId: group.id });

				// Delete transactions of member
				await deleteTransactionsByUserIdAndGroupId({ userId: member.id, groupId: group.id });

				// Show feedback
				setFeedback({
					type: "success",
					message: "Member removed from group.",
				});

				// Navigate
				router.dismissTo(`/groups/${group.id}/members`);
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
				<BottomModalTitle>Remove member from group</BottomModalTitle>

				<BottomModalTextContainer>
					<ThemedText shade={600}>
						Are you sure you want to remove {member?.name} from the group?
					</ThemedText>
					<ThemedText shade={600}>
						The transactions of {member?.name} will be deleted.
					</ThemedText>
				</BottomModalTextContainer>

				<Button
					variant="danger"
					title={`Remove ${member?.name}`}
					loading={loading}
					onPress={handleDeleteGroupMemberPress}
				/>
			</BottomModal>
		);
	}
);

// Display name
GroupMemberRemoveModal.displayName = "GroupMemberRemoveModal";

export default GroupMemberRemoveModal;
