import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import useFormData from "../../form/hooks/useFormData";
import { FILTER_TRANSACTIONS_FORM_DATA, FilterTransactionsFormData } from "../constants/formData";
import { Transaction } from "../types/transactionTypes";
import filterTransactions from "../utils/filterTransactions";
import getTransactionsFilterCount from "../utils/getTransactionsFilterCount";
import sortTransactions from "../utils/sortTransactions";

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
	const [filterCount, setFilterCount] = useState(0);
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	//#region Hooks
	useEffect(() => {
		if (transactions.length === 0) return;

		setFilteredTransactions(transactions);
	}, [transactions]);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			// Filter transactions
			const filteredTransactions = filterTransactions(transactions, data);

			// Sort transactions
			const sortedTransactions = sortTransactions(filteredTransactions, data);

			// Update state
			setFilteredTransactions(sortedTransactions);

			// Update filter count
			setFilterCount(getTransactionsFilterCount(data));
		}, 500);
	}, [data, transactions]);
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
