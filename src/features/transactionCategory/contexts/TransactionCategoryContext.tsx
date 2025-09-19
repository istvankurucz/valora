import { createContext, PropsWithChildren, useContext } from "react";
import useGetTransactionCategory from "../hooks/useGetTransactionCategory";
import { TransactionCategory } from "../types/transactionCategoryTypes";

// Context
type TransactionCategoryContextType = {
	transactionCategory: TransactionCategory | null;
	loading: boolean;
};
const TransactionCategoryContext = createContext<TransactionCategoryContextType>({
	transactionCategory: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const TransactionCategoryProvider = ({ children }: Props) => {
	// #region Hooks
	const { transactionCategory, loading } = useGetTransactionCategory();
	//#endregion

	return (
		<TransactionCategoryContext.Provider value={{ transactionCategory, loading }}>
			{children}
		</TransactionCategoryContext.Provider>
	);
};

// Hook
export const useTransactionCategory = () => useContext(TransactionCategoryContext);
