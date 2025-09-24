import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject } from "react";

type Props = ScreenHeaderProps & {
	title?: string;
	mainModalRef: RefObject<BottomSheetModal | null>;
};

const GroupTransactionHeader = ({ title, mainModalRef, ...rest }: Props) => {
	// #region Functions
	function showMainModal() {
		mainModalRef.current?.present();
	}
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			<Screen.Header.Options onPress={showMainModal} />
		</Screen.Header>
	);
};

export default GroupTransactionHeader;
