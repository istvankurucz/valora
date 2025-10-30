import useFormData from "@/src/features/form/hooks/useFormData";
import { createContext, ReactNode, useContext } from "react";
import { TransactionType } from "../../transaction/constants/transactionTypeOptions";
import useGetTransactionCategories from "../../transactionCategory/hooks/useGetTransactionCategories";
import { TransactionCategory } from "../../transactionCategory/types/transactionCategoryTypes";
import TransactionCategoriesOptionsModal from "../components/layout/TransactionCategoriesOptionsModal";
import {
	TRANSACTION_CATEGORIES_CHART_FORM_DATA,
	TransactionCategoriesChartFormData,
} from "../constants/formData";
import { useChartModal } from "./ChartModalContext";

// Context
type TransactionCategoriesChartContextType = {
	data: TransactionCategoriesChartFormData;
	updateData: (newData: Partial<TransactionCategoriesChartFormData>) => void;
	transactionCategories: TransactionCategory[];
};
const TransactionCategoriesChartContext = createContext<TransactionCategoriesChartContextType>({
	data: TRANSACTION_CATEGORIES_CHART_FORM_DATA,
	updateData: () => {},
	transactionCategories: [],
});

// Provider
type Props = {
	showIncomesOnLoad?: boolean;
	children?: ReactNode;
};

export const TransactionCategoriesChartProvider = ({ showIncomesOnLoad, children }: Props) => {
	// #region States
	const { data, updateData } = useFormData(
		showIncomesOnLoad
			? {
					...TRANSACTION_CATEGORIES_CHART_FORM_DATA,
					types: ["income", "expense"] as TransactionType[],
			  }
			: TRANSACTION_CATEGORIES_CHART_FORM_DATA
	);
	//#endregion

	// #region Hooks
	const { transactionCategories } = useGetTransactionCategories();
	const { modalRef } = useChartModal();
	//#endregion

	return (
		<TransactionCategoriesChartContext.Provider
			value={{ data, updateData, transactionCategories }}
		>
			{children}

			<TransactionCategoriesOptionsModal ref={modalRef} />
		</TransactionCategoriesChartContext.Provider>
	);
};

// Hook
export const useTransactionCategoriesChart = () => useContext(TransactionCategoriesChartContext);
