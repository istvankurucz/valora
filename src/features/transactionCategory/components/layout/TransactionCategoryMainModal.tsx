import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { forwardRef, RefObject } from "react";
import { useTransactionCategory } from "../../contexts/TransactionCategoryContext";

type Props = BottomModalProps & {
	deleteModalRef: RefObject<BottomSheetModal | null>;
};

const TransactionCategoryMainModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, deleteModalRef, ...rest }, ref) => {
		// #region Hooks
		const { transactionCategory } = useTransactionCategory();

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
				<BottomModalTitle>Category options</BottomModalTitle>

				<Link
					href={`/settings/transaction-categories/${transactionCategory?.id}/edit`}
					onPress={handleEditPress}
					asChild
				>
					<BottomModalListItem>
						<Ionicons name="pencil" size={24} color={defaultIconColor} />
						<ThemedText>Edit category</ThemedText>
					</BottomModalListItem>
				</Link>
				<BottomModalListItem onPress={handleDeletePress}>
					<Ionicons name="trash" size={24} color={deleteIconColor} />
					<ThemedText variant="danger" shade={500}>
						Delete category
					</ThemedText>
				</BottomModalListItem>
			</BottomModal>
		);
	}
);

// Display name
TransactionCategoryMainModal.displayName = "TransactionCategoryMainModal";

export default TransactionCategoryMainModal;
