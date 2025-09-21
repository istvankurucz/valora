import GroupTransactionsHeader from "@/src/features/group/components/layout/GroupTransactionsHeader";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import FilterTransactionsModal from "@/src/features/transaction/components/layout/FilterTransactionsModal";
import { FilterTransactionsProvider } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const GroupTransactionsLayout = () => {
	// #region Refs
	const filterModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	//#region Hooks
	const { group } = useGroup();
	//#endregion

	return (
		<FilterTransactionsProvider transactions={group?.transactions ?? []}>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<GroupTransactionsHeader title={options.title} filterModalRef={filterModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
			</Stack>

			<FilterTransactionsModal ref={filterModalRef} />
		</FilterTransactionsProvider>
	);
};

export default GroupTransactionsLayout;
