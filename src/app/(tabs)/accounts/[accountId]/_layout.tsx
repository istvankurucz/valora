import AccountDeleteModal from "@/src/features/account/components/layout/AccountDeleteModal";
import AccountHeader from "@/src/features/account/components/layout/AccountHeader/AccountHeader";
import AccountMainModal from "@/src/features/account/components/layout/AccountMainModal";
import { AccountProvider } from "@/src/features/account/contexts/AccountContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const AccountLayout = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<AccountProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<AccountHeader title={options.title} mainModalRef={mainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit account" }} />
				<Stack.Screen name="transactions" options={{ headerShown: false }} />
			</Stack>

			<AccountMainModal
				modalRef={mainModalRef}
				deleteModalRef={deleteModalRef}
				ref={mainModalRef}
			/>
			<AccountDeleteModal ref={deleteModalRef} />
		</AccountProvider>
	);
};

export default AccountLayout;
