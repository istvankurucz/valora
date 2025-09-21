import TransactionCategoryDeleteModal from "@/src/features/transactionCategory/components/layout/TransactionCategoryDeleteModal";
import TransactionCategoryHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoryHeader";
import TransactionCategoryMainModal from "@/src/features/transactionCategory/components/layout/TransactionCategoryMainModal";
import { TransactionCategoryProvider } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const TransactionCategoryLayout = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<TransactionCategoryProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<TransactionCategoryHeader title={options.title} mainModalRef={mainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit category" }} />
				<Stack.Screen name="transactions" options={{ headerShown: false }} />
			</Stack>

			<TransactionCategoryMainModal
				modalRef={mainModalRef}
				deleteModalRef={deleteModalRef}
				ref={mainModalRef}
			/>
			<TransactionCategoryDeleteModal ref={deleteModalRef} />
		</TransactionCategoryProvider>
	);
};

export default TransactionCategoryLayout;
