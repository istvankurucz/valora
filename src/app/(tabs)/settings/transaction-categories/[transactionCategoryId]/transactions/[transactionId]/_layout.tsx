import TransactionDeleteModal from "@/src/features/transaction/components/layout/TransactionDeleteModal";
import TransactionMainModal from "@/src/features/transaction/components/layout/TransactionMainModal";
import { TransactionProvider } from "@/src/features/transaction/contexts/TransactionContext";
import TransactionCategoryTransactionHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoryTransactionHeader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const TransactionCategoryTransactionLayout = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<TransactionProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<TransactionCategoryTransactionHeader
							title={options.title}
							mainModalRef={mainModalRef}
						/>
					),
				}}
			>
				<Stack.Screen name="index" options={{ title: "Transaction details" }} />
			</Stack>

			<TransactionMainModal
				modalRef={mainModalRef}
				deleteModalRef={deleteModalRef}
				ref={mainModalRef}
			/>
			<TransactionDeleteModal ref={deleteModalRef} />
		</TransactionProvider>
	);
};

export default TransactionCategoryTransactionLayout;
