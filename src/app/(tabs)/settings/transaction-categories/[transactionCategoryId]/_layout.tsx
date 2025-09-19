import TransactionCategoryHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoryHeader";
import TransactionCategoryMainModal from "@/src/features/transactionCategory/components/layout/TransactionCategoryMainModal";
import { TransactionCategoryProvider } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const TransactionCategoryLayout = () => {
	// #region Refs
	const transactionCategoryMainModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<TransactionCategoryProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<TransactionCategoryHeader
							title={options.title}
							mainModalRef={transactionCategoryMainModalRef}
						/>
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit category" }} />
			</Stack>

			<TransactionCategoryMainModal
				modalRef={transactionCategoryMainModalRef}
				ref={transactionCategoryMainModalRef}
			/>
		</TransactionCategoryProvider>
	);
};

export default TransactionCategoryLayout;
