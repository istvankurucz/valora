import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, PropsWithChildren, RefObject, useContext, useState } from "react";
import { Transaction, TransactionRecurringState } from "../types/transactionTypes";

type TransactionWithRecurringState = Transaction & {
	recurringState: TransactionRecurringState;
};

// Context
type RecurringTransactionContextType = {
	transaction: TransactionWithRecurringState | null;
	setTransaction: (transaction: TransactionWithRecurringState | null) => void;
	showModal: () => void;
	hideModal: () => void;
};
const RecurringTransactionContext = createContext<RecurringTransactionContextType>({
	transaction: null,
	setTransaction: () => {},
	showModal: () => {},
	hideModal: () => {},
});

// Provider
type Props = PropsWithChildren & {
	modalRef: RefObject<BottomSheetModal | null>;
};

export const RecurringTransactionProvider = ({ modalRef, children }: Props) => {
	// #region State
	const [transaction, setTransaction] = useState<TransactionWithRecurringState | null>(null);
	// #endregion

	//#region Functions
	function showModal() {
		modalRef.current?.present();
	}
	function hideModal() {
		modalRef.current?.dismiss();
	}
	//#endregion

	return (
		<RecurringTransactionContext.Provider
			value={{ transaction, setTransaction, showModal, hideModal }}
		>
			{children}
		</RecurringTransactionContext.Provider>
	);
};

// Hook
export const useRecurringTransaction = () => useContext(RecurringTransactionContext);
