import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { forwardRef, RefObject } from "react";
import { View } from "react-native";
import { useTransaction } from "../../contexts/TransactionContext";
import { useEditTransactionStore } from "../../store/editTransactionStore";
import { useNewTransactionStore } from "../../store/newTransactionStore";

type Props = BottomModalProps & {
	deleteModalRef: RefObject<BottomSheetModal | null>;
};

const TransactionMainModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, deleteModalRef, snapPoints, ...rest }, ref) => {
		// #region Hooks
		const { transaction } = useTransaction();
		const setTransactionToAdd = useNewTransactionStore((state) => state.setTransaction);
		const setTransactionToEdit = useEditTransactionStore((state) => state.setTransaction);

		const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
		const deleteIconColor = useThemeColor({ variant: "danger", shade: 500 });
		//#endregion

		// #region Functions
		function handleAddTransactionAgainPress() {
			setTransactionToAdd(transaction);
			modalRef?.current?.close();
		}

		function handleEditPress() {
			setTransactionToEdit(transaction);
			modalRef?.current?.close();
		}

		function handleDeletePress() {
			deleteModalRef.current?.present();
		}
		//#endregion

		return (
			<BottomModal snapPoints={[300]} {...rest} ref={ref}>
				<BottomModalTitle>Transaction options</BottomModalTitle>

				<Link
					href={{
						pathname: "/new-transaction",
					}}
					onPress={handleAddTransactionAgainPress}
					asChild
				>
					<BottomModalListItem>
						<Ionicons name="add" size={24} color={defaultIconColor} />
						<ThemedText>Add transaction again</ThemedText>
					</BottomModalListItem>
				</Link>

				<Link
					href={{
						pathname: "/edit-transaction",
					}}
					onPress={handleEditPress}
					asChild
				>
					<BottomModalListItem>
						<Ionicons name="pencil" size={24} color={defaultIconColor} />
						<ThemedText>Edit transaction</ThemedText>
					</BottomModalListItem>
				</Link>

				<BottomModalListItem onPress={handleDeletePress}>
					<Ionicons name="trash" size={24} color={deleteIconColor} />
					<View>
						<ThemedText variant="danger" shade={500}>
							Delete transaction
						</ThemedText>
					</View>
				</BottomModalListItem>
			</BottomModal>
		);
	}
);

// Display name
TransactionMainModal.displayName = "TransactionMainModal";

export default TransactionMainModal;
