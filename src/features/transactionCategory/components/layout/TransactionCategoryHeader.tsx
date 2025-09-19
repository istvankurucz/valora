import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, usePathname } from "expo-router";
import { RefObject } from "react";

type Props = ScreenHeaderProps & {
	title?: string;
	mainModalRef: RefObject<BottomSheetModal | null>;
};

const TransactionCategoryHeader = ({ title, mainModalRef, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	const { transactionCategoryId } = useLocalSearchParams<{ transactionCategoryId?: string }>();
	//#endregion

	// #region Constants
	const showOptionsButton =
		pathname === `/settings/transaction-categories/${transactionCategoryId}`;
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

export default TransactionCategoryHeader;
