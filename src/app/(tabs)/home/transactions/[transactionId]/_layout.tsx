import TransactionDeleteModal from "@/src/features/transaction/components/layout/TransactionDeleteModal";
import TransactionMainModal from "@/src/features/transaction/components/layout/TransactionMainModal";
import { TransactionProvider } from "@/src/features/transaction/contexts/TransactionContext";
import AdminTransactionHeader from "@/src/features/user/components/layout/AdminTransactionHeader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const HomeTransaction = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<TransactionProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<AdminTransactionHeader title={options.title} mainModalRef={mainModalRef} />
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

export default HomeTransaction;
