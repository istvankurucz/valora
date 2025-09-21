import AccountTransactionsHeader from "@/src/features/account/components/layout/AccountTransactionsHeader";
import { useAccount } from "@/src/features/account/contexts/AccountContext";
import FilterTransactionsModal from "@/src/features/transaction/components/layout/FilterTransactionsModal";
import { FilterTransactionsProvider } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const AccountTransactionsLayout = () => {
	// #region Refs
	const filterModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	//#region Hooks
	const { account } = useAccount();
	//#endregion

	return (
		<FilterTransactionsProvider transactions={account?.transactions ?? []}>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<AccountTransactionsHeader
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

export default AccountTransactionsLayout;
