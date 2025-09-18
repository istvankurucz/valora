import { createContext, PropsWithChildren, useContext } from "react";
import { EDIT_ACCOUNT_FORM_DATA, EditAccountFormData } from "../constants/formData";
import useEditAccountData from "../hooks/useEditAccountData";

// Context
type EditAccountContextType = {
	data: EditAccountFormData;
	updateData: (newData: Partial<EditAccountFormData>) => void;
};
const EditAccountContext = createContext<EditAccountContextType>({
	data: EDIT_ACCOUNT_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const EditAccountProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useEditAccountData();
	//#endregion

	return (
		<EditAccountContext.Provider value={{ data, updateData }}>
			{children}
		</EditAccountContext.Provider>
	);
};

// Hook
export const useEditAccount = () => useContext(EditAccountContext);
