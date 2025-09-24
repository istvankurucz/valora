import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import useFormData from "../../form/hooks/useFormData";
import { useGroup } from "../../group/contexts/GroupContext";
import GroupMembersBalanceChartOptionsModal from "../components/layout/GroupMembersBalanceChartOptionsModal";
import {
	GROUP_MEMBERS_BALANCE_CHART_FORM_DATA,
	GroupMembersBalanceChartFormData,
} from "../constants/formData";
import { GroupMembersBalanceChartData } from "../types/chartTypes";
import getGroupMembersBalanceChartData from "../utils/getGroupMembersBalanceChartData";
import { useChartNavigation } from "./ChartNavigationContext";

// Context
type GroupMembersBalanceChartContextType = {
	chartData: GroupMembersBalanceChartData[];
	data: GroupMembersBalanceChartFormData;
	updateData: (newData: Partial<GroupMembersBalanceChartFormData>) => void;
	showOptionsModal: () => void;
	hideOptionsModal: () => void;
};
const GroupMembersBalanceChartContext = createContext<GroupMembersBalanceChartContextType>({
	chartData: [],
	data: GROUP_MEMBERS_BALANCE_CHART_FORM_DATA,
	updateData: () => {},
	showOptionsModal: () => {},
	hideOptionsModal: () => {},
});

// Provider
type Props = PropsWithChildren;

export const GroupMembersBalanceChartProvider = ({ children }: Props) => {
	//#region States
	const [chartData, setChartData] = useState<GroupMembersBalanceChartData[]>([]);
	const { data, updateData } = useFormData(GROUP_MEMBERS_BALANCE_CHART_FORM_DATA);
	//#endregion

	// #region Refs
	const optionsModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	// #region Hooks
	const { group } = useGroup();
	const { interval, date } = useChartNavigation();

	useEffect(() => {
		// Get chart data
		const chartData = getGroupMembersBalanceChartData(group?.transactions ?? [], {
			date,
			interval,
			members: group?.users ?? [],
		});

		// Update state
		setChartData(chartData);
	}, [group, date, interval]);
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
		<GroupMembersBalanceChartContext.Provider
			value={{ chartData, data, updateData, showOptionsModal, hideOptionsModal }}
		>
			{children}

			<GroupMembersBalanceChartOptionsModal ref={optionsModalRef} />
		</GroupMembersBalanceChartContext.Provider>
	);
};

// Hook
export const useGroupMembersBalanceChartData = () => useContext(GroupMembersBalanceChartContext);
