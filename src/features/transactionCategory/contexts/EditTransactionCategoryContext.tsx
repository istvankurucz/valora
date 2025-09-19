import { createContext, PropsWithChildren, useContext } from "react";
import {
	EDIT_TRANSACTION_CATEGORY_FORM_DATA,
	EditTransactionCategoryFormData,
} from "../constants/formData";
import useEditTransactionCategoryData from "../hooks/useEditTransactionCategoryData";

// Context
type EditTransactionCategoryContextType = {
	data: EditTransactionCategoryFormData;
	updateData: (newData: Partial<EditTransactionCategoryFormData>) => void;
};
const EditTransactionCategoryContext = createContext<EditTransactionCategoryContextType>({
	data: EDIT_TRANSACTION_CATEGORY_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const EditTransactionCategoryProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useEditTransactionCategoryData();
	//#endregion

	return (
		<EditTransactionCategoryContext.Provider value={{ data, updateData }}>
			{children}
		</EditTransactionCategoryContext.Provider>
	);
};

// Hook
export const useEditTransactionCategory = () => useContext(EditTransactionCategoryContext);
