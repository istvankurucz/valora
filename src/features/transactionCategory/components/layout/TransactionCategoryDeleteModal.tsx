import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import DeleteTransactionCategoryForm from "../form/DeleteTransactionCategoryForm";

type Props = BottomModalProps;

const TransactionCategoryDeleteModal = forwardRef<BottomSheetModal, Props>(
	({ stackBehavior, ...rest }, ref) => {
		return (
			<BottomModal
				snapPoints={[500]}
				stackBehavior={stackBehavior ?? "replace"}
				{...rest}
				ref={ref}
			>
				<BottomModalTitle>Delete category</BottomModalTitle>

				<BottomModalTextContainer>
					<ThemedText shade={600}>Are you sure you want to delete the category?</ThemedText>
				</BottomModalTextContainer>

				<DeleteTransactionCategoryForm />
			</BottomModal>
		);
	}
);

// Display name
TransactionCategoryDeleteModal.displayName = "TransactionCategoryDeleteModal";

export default TransactionCategoryDeleteModal;
