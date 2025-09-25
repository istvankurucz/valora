import { createContext, PropsWithChildren, useContext } from "react";
import useGetTransactionsByAdminId from "../../transaction/hooks/useGetTransactionsByAdminId";
import { Transaction } from "../../transaction/types/transactionTypes";

// Context
export type AdminTransactionsContextType = {
	transactions: Transaction[];
	loading: boolean;
};
const AdminTransactionsContext = createContext<AdminTransactionsContextType>({
	transactions: [],
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const AdminTransactionsProvider = ({ children }: Props) => {
	//#region Hooks
	const { transactions, loading } = useGetTransactionsByAdminId();
	//#endregion

	return (
		<AdminTransactionsContext.Provider value={{ transactions, loading }}>
			{children}
		</AdminTransactionsContext.Provider>
	);
};

// Hook
export const useAdminTransactions = () => useContext(AdminTransactionsContext);
