import RecurringTransactionModal from "@/src/features/transaction/components/layout/RecurringTransactionModal";
import { RecurringTransactionProvider } from "@/src/features/transaction/contexts/RecurringTransactionContext";
import SettingsHeader from "@/src/features/user/components/layout/SettingsHeader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const SettingsLayout = () => {
	// #region Refs
	const modalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<RecurringTransactionProvider modalRef={modalRef}>
			<Stack
				screenOptions={{ header: ({ options }) => <SettingsHeader title={options.title} /> }}
			>
				<Stack.Screen name="index" options={{ title: "Settings" }} />
				<Stack.Screen name="my-data" options={{ title: "My data" }} />
				<Stack.Screen name="transaction-categories" options={{ headerShown: false }} />
				<Stack.Screen name="users" options={{ headerShown: false }} />
				<Stack.Screen
					name="recurring-transactions"
					options={{ title: "Recurring transactions" }}
				/>
				<Stack.Screen name="data-transfer" options={{ title: "Data transfer" }} />
				<Stack.Screen name="info" options={{ title: "Info" }} />
			</Stack>

			<RecurringTransactionModal ref={modalRef} />
		</RecurringTransactionProvider>
	);
};

export default SettingsLayout;
