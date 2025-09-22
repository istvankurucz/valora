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
import { useUser } from "../../contexts/UserContext";
import useDeleteUser from "../../hooks/useDeleteUser";

type Props = BottomModalProps;

const UserDeleteModal = forwardRef<BottomSheetModal, Props>(({ stackBehavior, ...rest }, ref) => {
	// #region Hooks
	const { user } = useUser();
	const { deleteUser, loading: loadingDeleteUser } = useDeleteUser();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	const router = useRouter();
	//#endregion

	// #region Constants
	const loading = loadingDeleteUser;
	//#endregion

	//#region Functions
	async function handleDeleteUserPress() {
		// Check user
		if (!user) return;

		try {
			// Delete user
			await deleteUser(user.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "User deleted.",
			});

			// Navigate
			router.dismissTo("/settings/users");
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
			<BottomModalTitle>Delete user</BottomModalTitle>

			<BottomModalTextContainer>
				<ThemedText shade={600}>Are you sure you want to delete the user?</ThemedText>
				<ThemedText shade={600}>
					User will be removed from all groups and his transactions will be deleted.
				</ThemedText>
			</BottomModalTextContainer>

			<Button
				variant="danger"
				title="Delete user"
				loading={loading}
				onPress={handleDeleteUserPress}
			/>
		</BottomModal>
	);
});

// Display name
UserDeleteModal.displayName = "UserDeleteModal";

export default UserDeleteModal;
