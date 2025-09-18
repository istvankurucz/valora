import { createContext, PropsWithChildren, useContext } from "react";
import { EDIT_GROUP_FORM_DATA, EditGroupFormData } from "../constants/formData";
import useEditGroupData from "../hooks/useEditGroupData";

// Context
type EditGroupContextType = {
	data: EditGroupFormData;
	updateData: (newData: Partial<EditGroupFormData>) => void;
};
const EditGroupContext = createContext<EditGroupContextType>({
	data: EDIT_GROUP_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const EditGroupProvider = ({ children }: Props) => {
	// #region States
	const { data, updateData } = useEditGroupData();
	//#endregion

	return (
		<EditGroupContext.Provider value={{ data, updateData }}>{children}</EditGroupContext.Provider>
	);
};

// Hook
export const useEditGroup = () => useContext(EditGroupContext);
