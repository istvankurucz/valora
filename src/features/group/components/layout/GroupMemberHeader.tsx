import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { useGroupMember } from "../../contexts/GroupMemberContext";

type Props = ScreenHeaderProps & {
	title?: string;
	mainModalRef: RefObject<BottomSheetModal | null>;
};

const GroupMemberHeader = ({ title, mainModalRef, ...rest }: Props) => {
	// #region Hooks
	const { member } = useGroupMember();
	const { admin } = useAdminUser();
	//#endregion

	// #region Constants
	const showOptionsButton = member?.id !== admin?.id;
	//#endregion

	// #region Functions
	function showMainModal() {
		mainModalRef.current?.present();
	}
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showOptionsButton ? (
				<Screen.Header.Options onPress={showMainModal} />
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default GroupMemberHeader;
