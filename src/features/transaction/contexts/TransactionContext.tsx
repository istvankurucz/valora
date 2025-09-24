import { createContext, PropsWithChildren, useContext } from "react";
import useGetTransaction from "../hooks/useGetTransaction";
import { Transaction } from "../types/transactionTypes";

// Context
type TransactionContextType = {
	transaction: Transaction | null;
	loading: boolean;
};
const TransactionContext = createContext<TransactionContextType>({
	transaction: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const TransactionProvider = ({ children }: Props) => {
	// #region Hooks
	const { transaction, loading } = useGetTransaction();
	//#endregion

	return (
		<TransactionContext.Provider value={{ transaction, loading }}>
			{children}
		</TransactionContext.Provider>
	);
};

// Hook
export const useTransaction = () => useContext(TransactionContext);
