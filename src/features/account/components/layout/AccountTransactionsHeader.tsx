import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { useFilterTransactions } from "@/src/features/transaction/contexts/FilterTransactionsContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject } from "react";

type Props = ScreenHeaderProps & {
	title?: string;
	filterModalRef: RefObject<BottomSheetModal | null>;
};

const AccountTransactionsHeader = ({ title, filterModalRef, ...rest }: Props) => {
	// #region Hooks
	const { filterCount } = useFilterTransactions();
	//#endregion

	// #region Functions
	function handleFilterPress() {
		filterModalRef.current?.present();
	}
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			<Screen.Header.Filter filterCount={filterCount} onPress={handleFilterPress} />
		</Screen.Header>
	);
};

export default AccountTransactionsHeader;
