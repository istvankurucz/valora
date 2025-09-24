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

type Props = BottomModalProps & {
	deleteModalRef: RefObject<BottomSheetModal | null>;
};

const TransactionMainModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, deleteModalRef, ...rest }, ref) => {
		// #region Hooks
		const { transaction } = useTransaction();

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
				<BottomModalTitle>Transaction options</BottomModalTitle>

				<Link
					href={{
						pathname: `/edit-transaction`,
						params: { transactionData: JSON.stringify(transaction) },
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
