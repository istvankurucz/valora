import { createContext, PropsWithChildren, useContext } from "react";
import useFormData from "../../form/hooks/useFormData";
import {
	NEW_TRANSACTION_CATEGORY_FORM_DATA,
	NewTransactionCategoryFormData,
} from "../constants/formData";

// Context
type NewTransactionCategoryContextType = {
	data: NewTransactionCategoryFormData;
	updateData: (newData: Partial<NewTransactionCategoryFormData>) => void;
};
const NewTransactionCategoryContext = createContext<NewTransactionCategoryContextType>({
	data: NEW_TRANSACTION_CATEGORY_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const NewTransactionCategoryProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useFormData(NEW_TRANSACTION_CATEGORY_FORM_DATA);
	//#endregion

	return (
		<NewTransactionCategoryContext.Provider value={{ data, updateData }}>
			{children}
		</NewTransactionCategoryContext.Provider>
	);
};

// Hook
export const useNewTransactionCategory = () => useContext(NewTransactionCategoryContext);
