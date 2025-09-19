import { createContext, PropsWithChildren, useContext } from "react";
import useGetTransactionCategories from "../hooks/useGetTransactionCategories";
import { TransactionCategory } from "../types/transactionCategoryTypes";

// Context
type TransactionCategoriesContextType = {
	transactionCategories: TransactionCategory[];
	loading: boolean;
};
const TransactionCategoriesContext = createContext<TransactionCategoriesContextType>({
	transactionCategories: [],
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const TransactionCategoriesProvider = ({ children }: Props) => {
	// #region Hooks
	const { transactionCategories, loading } = useGetTransactionCategories();
	//#endregion

	return (
		<TransactionCategoriesContext.Provider value={{ transactionCategories, loading }}>
			{children}
		</TransactionCategoriesContext.Provider>
	);
};

// Hook
export const useTransactionCategories = () => useContext(TransactionCategoriesContext);
