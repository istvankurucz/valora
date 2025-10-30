import { createContext, PropsWithChildren, useContext } from "react";
import useFormData from "../../form/hooks/useFormData";
import GroupMembersBalanceChartOptionsModal from "../components/layout/GroupMembersBalanceChartOptionsModal";
import {
	GROUP_MEMBERS_BALANCE_CHART_FORM_DATA,
	GroupMembersBalanceChartFormData,
} from "../constants/formData";
import { useChartModal } from "./ChartModalContext";

// Context
type GroupMembersBalanceChartContextType = {
	data: GroupMembersBalanceChartFormData;
	updateData: (newData: Partial<GroupMembersBalanceChartFormData>) => void;
};
const GroupMembersBalanceChartContext = createContext<GroupMembersBalanceChartContextType>({
	data: GROUP_MEMBERS_BALANCE_CHART_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const GroupMembersBalanceChartProvider = ({ children }: Props) => {
	//#region States
	const { data, updateData } = useFormData(GROUP_MEMBERS_BALANCE_CHART_FORM_DATA);
	const { modalRef } = useChartModal();
	//#endregion

	return (
		<GroupMembersBalanceChartContext.Provider value={{ data, updateData }}>
			{children}

			<GroupMembersBalanceChartOptionsModal ref={modalRef} />
		</GroupMembersBalanceChartContext.Provider>
	);
};

// Hook
export const useGroupMembersBalanceChart = () => useContext(GroupMembersBalanceChartContext);
