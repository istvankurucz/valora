import { Transaction } from "@/src/features/transaction/types/transactionTypes";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";

// Context
type ChartContextType = {
	transactions: Transaction[];
	selectedIndex: number | null;
	setSelectedIndex: Dispatch<SetStateAction<number | null>>;
};
const ChartContext = createContext<ChartContextType>({
	transactions: [],
	selectedIndex: null,
	setSelectedIndex: () => {},
});

// Provider
type Props = PropsWithChildren & {
	transactions: Transaction[];
};

export const ChartProvider = ({ transactions, children }: Props) => {
	//#region States
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	//#endregion

	return (
		<ChartContext.Provider value={{ transactions, selectedIndex, setSelectedIndex }}>
			{children}
		</ChartContext.Provider>
	);
};

// Hook
export const useChart = () => useContext(ChartContext);
