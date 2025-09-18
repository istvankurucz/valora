import AccountHeader from "@/src/features/account/components/layout/AccountHeader/AccountHeader";
import AccountMainModal from "@/src/features/account/components/layout/AccountMainModal";
import { AccountProvider } from "@/src/features/account/contexts/AccountContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const AccountLayout = () => {
	// #region Refs
	const accountMainModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<AccountProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<AccountHeader title={options.title} mainModalRef={accountMainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit account" }} />
			</Stack>

			<AccountMainModal modalRef={accountMainModalRef} ref={accountMainModalRef} />
		</AccountProvider>
	);
};

export default AccountLayout;
