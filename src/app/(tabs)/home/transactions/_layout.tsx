import FilterTransactionsModal from "@/src/features/transaction/components/layout/FilterTransactionsModal";
import { FilterTransactionsProvider } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import AdminTransactionsHeader from "@/src/features/user/components/layout/AdminTransactionsHeader";
import { useAdminTransactions } from "@/src/features/user/contexts/AdminTransactionsContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const HomeTransactionsLayout = () => {
	// #region Refs
	const filterModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	//#region Hooks
	const { transactions } = useAdminTransactions();
	//#endregion

	return (
		<FilterTransactionsProvider transactions={transactions}>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<AdminTransactionsHeader title={options.title} filterModalRef={filterModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" options={{ title: "Transactions" }} />
				<Stack.Screen name="[transactionId]" options={{ headerShown: false }} />
			</Stack>

			<FilterTransactionsModal ref={filterModalRef} />
		</FilterTransactionsProvider>
	);
};

export default HomeTransactionsLayout;
