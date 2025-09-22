import SettingsMemberHeader from "@/src/features/user/components/layout/SettingsMemberHeader";
import UserDeleteModal from "@/src/features/user/components/layout/UserDeleteModal";
import UserMainModal from "@/src/features/user/components/layout/UserMainModal";
import { UserProvider } from "@/src/features/user/contexts/UserContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const SettingsMemberLayout = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<UserProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<SettingsMemberHeader title={options.title} mainModalRef={mainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit user" }} />
			</Stack>

			<UserMainModal
				modalRef={mainModalRef}
				deleteModalRef={deleteModalRef}
				ref={mainModalRef}
			/>
			<UserDeleteModal ref={deleteModalRef} />
		</UserProvider>
	);
};

export default SettingsMemberLayout;
