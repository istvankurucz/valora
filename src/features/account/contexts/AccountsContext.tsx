import { createContext, PropsWithChildren, useContext } from "react";
import useGetAccounts from "../hooks/useGetAccounts";
import { Account } from "../types/accountTypes";

// Context
type AccountsContextType = {
	accounts: Account[];
	loading: boolean;
};
const AccountsContext = createContext<AccountsContextType>({
	accounts: [],
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const AccountsProvider = ({ children }: Props) => {
	// #region Hooks
	const { accounts, loading } = useGetAccounts();
	//#endregion

	return (
		<AccountsContext.Provider value={{ accounts, loading }}>{children}</AccountsContext.Provider>
	);
};

// Hook
export const useAccounts = () => useContext(AccountsContext);
