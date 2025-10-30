import { createContext, PropsWithChildren, useContext } from "react";
import useFormData from "../../form/hooks/useFormData";
import AccountsBalanceChartOptionsModal from "../components/layout/AccountsBalanceChartOptionsModal";
import {
	ACCOUNTS_BALANCE_CHART_FORM_DATA,
	AccountsBalanceChartFormData,
} from "../constants/formData";
import { useChartModal } from "./ChartModalContext";

// Context
type AccountsBalanceChartContextType = {
	data: AccountsBalanceChartFormData;
	updateData: (newData: Partial<AccountsBalanceChartFormData>) => void;
};
const AccountsBalanceChartContext = createContext<AccountsBalanceChartContextType>({
	data: ACCOUNTS_BALANCE_CHART_FORM_DATA,
	updateData: () => {},
});

// Provider
type Props = PropsWithChildren;

export const AccountsBalanceChartProvider = ({ children }: Props) => {
	//#region States
	const { data, updateData } = useFormData(ACCOUNTS_BALANCE_CHART_FORM_DATA);
	//#endregion

	// #region Hooks
	const { modalRef } = useChartModal();
	//#endregion

	return (
		<AccountsBalanceChartContext.Provider value={{ data, updateData }}>
			{children}

			<AccountsBalanceChartOptionsModal ref={modalRef} />
		</AccountsBalanceChartContext.Provider>
	);
};

// Provider
export const useAccountsBalanceChart = () => useContext(AccountsBalanceChartContext);
