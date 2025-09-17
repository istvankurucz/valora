import { createContext, PropsWithChildren, useContext } from "react";
import useFormData from "../../form/hooks/useFormData";
import { NEW_ACCOUNT_FORM_DATA, NewAccountFormData } from "../constants/formData";

// Context
type NewAccountContextType = {
	data: NewAccountFormData;
	updateData: (newData: Partial<NewAccountFormData>) => void;
};
const NewAccountContext = createContext<NewAccountContextType>({
	data: NEW_ACCOUNT_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const NewAccountProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useFormData(NEW_ACCOUNT_FORM_DATA);
	//#endregion

	return (
		<NewAccountContext.Provider value={{ data, updateData }}>
			{children}
		</NewAccountContext.Provider>
	);
};

// Hook
export const useNewAccount = () => useContext(NewAccountContext);
