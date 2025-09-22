import GroupMemberHeader from "@/src/features/group/components/layout/GroupMemberHeader";
import GroupMemberMainModal from "@/src/features/group/components/layout/GroupMemberMainModal";
import GroupMemberRemoveModal from "@/src/features/group/components/layout/GroupMemberRemoveModal";
import { GroupMemberProvider } from "@/src/features/group/contexts/GroupMemberContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useRef } from "react";

const GroupMemberLayout = () => {
	// #region Refs
	const mainModalRef = useRef<BottomSheetModal>(null);
	const deleteModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	return (
		<GroupMemberProvider>
			<Stack
				screenOptions={{
					header: ({ options }) => (
						<GroupMemberHeader title={options.title} mainModalRef={mainModalRef} />
					),
				}}
			>
				<Stack.Screen name="index" />
			</Stack>

			<GroupMemberMainModal
				modalRef={mainModalRef}
				deleteModalRef={deleteModalRef}
				ref={mainModalRef}
			/>
			<GroupMemberRemoveModal ref={deleteModalRef} />
		</GroupMemberProvider>
	);
};

export default GroupMemberLayout;
