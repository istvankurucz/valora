import GroupHeader from "@/src/features/group/components/layout/GroupHeader";
import GroupMainModal from "@/src/features/group/components/layout/GroupMainModal";
import { GroupProvider } from "@/src/features/group/contexts/GroupContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const GroupLayout = () => {
	// #region Refs
	const groupMainModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<GroupProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<GroupHeader title={options.title} mainModalRef={groupMainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="edit" options={{ title: "Edit group" }} />
			</Stack>

			<GroupMainModal modalRef={groupMainModalRef} ref={groupMainModalRef} />
		</GroupProvider>
	);
};

export default GroupLayout;
