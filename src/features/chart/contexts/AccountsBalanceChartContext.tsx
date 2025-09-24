import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { useAccounts } from "../../account/contexts/AccountsContext";
import useFormData from "../../form/hooks/useFormData";
import AccountsBalanceChartOptionsModal from "../components/layout/AccountsBalanceChartOptionsModal";
import {
	ACCOUNTS_BALANCE_CHART_FORM_DATA,
	AccountsBalanceChartFormData,
	TRANSACTION_CATEGORIES_CHART_FORM_DATA,
} from "../constants/formData";
import { AccountBalanceChartData } from "../types/chartTypes";
import getAccountsBalanceChartData from "../utils/getAccountsBalanceChartData";
import { useChartNavigation } from "./ChartNavigationContext";

// Context
type AccountsBalanceChartContextType = {
	chartData: AccountBalanceChartData[];
	data: AccountsBalanceChartFormData;
	updateData: (newData: Partial<AccountsBalanceChartFormData>) => void;
	showOptionsModal: () => void;
	hideOptionsModal: () => void;
};
const AccountsBalanceChartContext = createContext<AccountsBalanceChartContextType>({
	chartData: [],
	data: ACCOUNTS_BALANCE_CHART_FORM_DATA,
	updateData: () => {},
	showOptionsModal: () => {},
	hideOptionsModal: () => {},
});

// Provider
type Props = PropsWithChildren;

export const AccountsBalanceChartProvider = ({ children }: Props) => {
	//#region States
	const [chartData, setChartData] = useState<AccountBalanceChartData[]>([]);
	const { data, updateData } = useFormData(TRANSACTION_CATEGORIES_CHART_FORM_DATA);
	//#endregion

	// #region Refs
	const optionsModalRef = useRef<BottomSheetModal>(null);
	//#endregion

	// #region Hooks
	const { interval, date } = useChartNavigation();
	const { accounts } = useAccounts();

	useEffect(() => {
		// Get chart data
		const chartData = getAccountsBalanceChartData(accounts, { date, interval });

		// Update state
		setChartData(chartData);
	}, [accounts, date, interval]);
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
		<AccountsBalanceChartContext.Provider
			value={{ chartData, data, updateData, showOptionsModal, hideOptionsModal }}
		>
			{children}

			<AccountsBalanceChartOptionsModal ref={optionsModalRef} />
		</AccountsBalanceChartContext.Provider>
	);
};

// Provider
export const useAccountsBalanceChartData = () => useContext(AccountsBalanceChartContext);
