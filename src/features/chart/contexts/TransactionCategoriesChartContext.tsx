import useFormData from "@/src/features/form/hooks/useFormData";
import useGetTransactionCategories from "@/src/features/transactionCategory/hooks/useGetTransactionCategories";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TransactionType } from "../../transaction/constants/transactionTypeOptions";
import TransactionCategoriesOptionsModal from "../components/layout/TransactionCategoriesOptionsModal";
import {
	TRANSACTION_CATEGORIES_CHART_FORM_DATA,
	TransactionCategoriesChartFormData,
} from "../constants/formData";
import { TransactionCategoriesChartData } from "../types/chartTypes";
import getTransactionCategoriesChartData from "../utils/getTransactionCategoriesChartData";
import { useChart } from "./ChartContext";
import { useChartNavigation } from "./ChartNavigationContext";

// Context
type TransactionCategoriesChartContextType = {
	chartData: TransactionCategoriesChartData[];
	data: TransactionCategoriesChartFormData;
	updateData: (newData: Partial<TransactionCategoriesChartFormData>) => void;
	showOptionsModal: () => void;
	hideOptionsModal: () => void;
};
const TransactionCategoriesChartContext = createContext<TransactionCategoriesChartContextType>({
	chartData: [],
	data: TRANSACTION_CATEGORIES_CHART_FORM_DATA,
	updateData: () => {},
	showOptionsModal: () => {},
	hideOptionsModal: () => {},
});

// Provider
type Props = {
	showIncomesOnLoad?: boolean;
	children?: ReactNode;
};

export const TransactionCategoriesChartProvider = ({ showIncomesOnLoad, children }: Props) => {
	// #region States
	const [chartData, setChartData] = useState<TransactionCategoriesChartData[]>([]);
	const { data, updateData } = useFormData(
		showIncomesOnLoad
			? {
					...TRANSACTION_CATEGORIES_CHART_FORM_DATA,
					types: ["income", "expense"] as TransactionType[],
			  }
			: TRANSACTION_CATEGORIES_CHART_FORM_DATA
	);
	//#endregion

	// #region Refs
	const optionsModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	// #region Hooks
	const { transactions } = useChart();
	const { interval, date } = useChartNavigation();
	const { transactionCategories } = useGetTransactionCategories();

	useEffect(() => {
		// Get chart data
		const chartData = getTransactionCategoriesChartData(transactions, {
			interval,
			date,
			categories: transactionCategories,
			transactionTypes: data.types,
		});

		// Update state
		setChartData(chartData);
	}, [data.types, transactions, interval, date, transactionCategories]);
	//#endregion

	// #region Functions
	function showOptionsModal() {
		optionsModalRef.current?.present();
	}
	function hideOptionsModal() {
		optionsModalRef.current?.close();
	}
	//#endregion

	return (
		<TransactionCategoriesChartContext.Provider
			value={{ chartData, data, updateData, showOptionsModal, hideOptionsModal }}
		>
			{children}

			<TransactionCategoriesOptionsModal ref={optionsModalRef} />
		</TransactionCategoriesChartContext.Provider>
	);
};

// Hook
export const useTransactionCategoriesChart = () => useContext(TransactionCategoriesChartContext);
