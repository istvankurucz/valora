import { createContext, PropsWithChildren, useContext } from "react";
import useFormData from "../../form/hooks/useFormData";
import { NEW_GROUP_FORM_DATA, NewGroupFormData } from "../constants/formData";

// Context
type NewGroupContextType = {
	data: NewGroupFormData;
	updateData: (newData: Partial<NewGroupFormData>) => void;
};
const NewGroupContext = createContext<NewGroupContextType>({
	data: NEW_GROUP_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const NewGroupProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useFormData(NEW_GROUP_FORM_DATA);
	//#endregion

	return (
		<NewGroupContext.Provider value={{ data, updateData }}>{children}</NewGroupContext.Provider>
	);
};

// Hook
export const useNewGroup = () => useContext(NewGroupContext);
