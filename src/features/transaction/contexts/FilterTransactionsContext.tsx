import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import useFormData from "../../form/hooks/useFormData";
import { FILTER_TRANSACTIONS_FORM_DATA, FilterTransactionsFormData } from "../constants/formData";
import { Transaction } from "../types/transactionTypes";
import getTransactionsFilterCount from "../utils/getTransactionsFilterCount";

// Context
type FilterTransactionsContextType = {
	transactions: Transaction[];
	filteredTransactions: Transaction[];
	setFilteredTransactions: Dispatch<SetStateAction<Transaction[]>>;
	filterCount: number;
	setFilterCount: Dispatch<SetStateAction<number>>;
	data: FilterTransactionsFormData;
	updateData: (newData: Partial<FilterTransactionsFormData>) => void;
};
const FilterTransactionsContext = createContext<FilterTransactionsContextType>({
	transactions: [],
	filteredTransactions: [],
	setFilteredTransactions: () => {},
	filterCount: 0,
	setFilterCount: () => {},
	data: FILTER_TRANSACTIONS_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren & {
	transactions: Transaction[];
};

export const FilterTransactionsProvider = ({ transactions, children }: Props) => {
	// #region States
	const [filteredTransactions, setFilteredTransactions] = useState(transactions);
	const { data, updateData } = useFormData(FILTER_TRANSACTIONS_FORM_DATA);
	const [filterCount, setFilterCount] = useState(getTransactionsFilterCount(data));
	//#endregion

	//#region Hooks
	useEffect(() => {
		if (transactions.length === 0) return;

		setFilteredTransactions(transactions);
	}, [transactions]);
	//#endregion

	return (
		<FilterTransactionsContext.Provider
			value={{
				transactions,
				filteredTransactions,
				setFilteredTransactions,
				filterCount,
				setFilterCount,
				data,
				updateData,
			}}
		>
			{children}
		</FilterTransactionsContext.Provider>
	);
};

// Hook
export const useFilterTransactions = () => useContext(FilterTransactionsContext);
