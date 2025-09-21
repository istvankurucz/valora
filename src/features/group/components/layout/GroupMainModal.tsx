import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { forwardRef, RefObject } from "react";
import { useGroup } from "../../contexts/GroupContext";

type Props = BottomModalProps & {
	deleteModalRef: RefObject<BottomSheetModal | null>;
};

const GroupMainModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, deleteModalRef, ...rest }, ref) => {
		// #region Hooks
		const { group } = useGroup();

		const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
		const deleteIconColor = useThemeColor({ variant: "danger", shade: 500 });
		//#endregion

		// #region Functions
		function handleEditPress() {
			modalRef?.current?.close();
		}

		function handleDeletePress() {
			deleteModalRef.current?.present();
		}
		//#endregion

		return (
			<BottomModal {...rest} ref={ref}>
				<BottomModalTitle>Group options</BottomModalTitle>

				<Link href={`/groups/${group?.id}/edit`} onPress={handleEditPress} asChild>
					<BottomModalListItem>
						<Ionicons name="pencil" size={24} color={defaultIconColor} />
						<ThemedText>Edit group</ThemedText>
					</BottomModalListItem>
				</Link>
				<BottomModalListItem onPress={handleDeletePress}>
					<Ionicons name="trash" size={24} color={deleteIconColor} />
					<ThemedText variant="danger" shade={500}>
						Delete group
					</ThemedText>
				</BottomModalListItem>
			</BottomModal>
		);
	}
);

// Display name
GroupMainModal.displayName = "GroupMainModal";

export default GroupMainModal;
