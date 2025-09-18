import { createContext, PropsWithChildren, useContext } from "react";
import useGetAccount from "../hooks/useGetAccount";
import { Account } from "../types/accountTypes";

// Context
type AccountContextType = {
	account: Account | null;
	loading: boolean;
};
const AccountContext = createContext<AccountContextType>({
	account: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const AccountProvider = ({ children }: Props) => {
	// #region Hooks
	const { account, loading } = useGetAccount();
	//#endregion

	return (
		<AccountContext.Provider value={{ account, loading }}>{children}</AccountContext.Provider>
	);
};

// Hook
export const useAccount = () => useContext(AccountContext);
