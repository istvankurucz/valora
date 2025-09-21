import FilterTransactionsModal from "@/src/features/transaction/components/layout/FilterTransactionsModal";
import { FilterTransactionsProvider } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import TransactionCategoriesTransactionsHeader from "@/src/features/transactionCategory/components/layout/TransactionCategoriesTransactionsHeader";
import { useTransactionCategory } from "@/src/features/transactionCategory/contexts/TransactionCategoryContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const TransactionCategoryTransactionsLayout = () => {
	// #region Refs
	const filterModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	//#region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	return (
		<FilterTransactionsProvider transactions={transactionCategory?.transactions ?? []}>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<TransactionCategoriesTransactionsHeader
							title={options.title}
							filterModalRef={filterModalRef}
						/>
					),
				}}
			>
				<Stack.Screen name="index" />
			</Stack>

			<FilterTransactionsModal ref={filterModalRef} />
		</FilterTransactionsProvider>
	);
};

export default TransactionCategoryTransactionsLayout;
