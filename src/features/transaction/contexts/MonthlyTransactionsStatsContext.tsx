import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from "react";
import MonthlyTransactionsStatsModal from "../components/layout/MonthlyTransactionsStatsModal";
import { TransactionsSectionData } from "../types/transactionTypes";

// Context
type MonthlyTransactionsStatsContextType = {
	transactionsSectionData: TransactionsSectionData | null;
	setTransactionsSectionData: Dispatch<SetStateAction<TransactionsSectionData | null>>;
	showModal: () => void;
	hideModal: () => void;
};
const MonthlyTransactionsStatsContext = createContext<MonthlyTransactionsStatsContextType>({
	transactionsSectionData: null,
	setTransactionsSectionData: () => {},
	showModal: () => {},
	hideModal: () => {},
});

// Provider
type Props = PropsWithChildren;

export const MonthlyTransactionsStatsProvider = ({ children }: Props) => {
	// #region States
	const [transactionsSectionData, setTransactionsSectionData] =
		useState<TransactionsSectionData | null>(null);
	//#endregion

	// #region Refs
	const modalRef = useRef<BottomSheetModal>(null);
	//#endregion

	// #region Functions
	function showModal() {
		modalRef.current?.present();
	}
	function hideModal() {
		modalRef.current?.close();
	}
	//#endregion

	return (
		<MonthlyTransactionsStatsContext.Provider
			value={{
				transactionsSectionData,
				setTransactionsSectionData,
				showModal,
				hideModal,
			}}
		>
			{children}

			<MonthlyTransactionsStatsModal ref={modalRef} />
		</MonthlyTransactionsStatsContext.Provider>
	);
};

// Hook
export const useMonthlyTransactionsStats = () => useContext(MonthlyTransactionsStatsContext);
