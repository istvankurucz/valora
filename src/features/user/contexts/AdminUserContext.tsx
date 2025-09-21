import { createContext, PropsWithChildren, useContext } from "react";
import useGetAdminUser from "../hooks/useGetAdminUser";
import { AdminUser } from "../types/userTypes";

// Context
type AdminUserContextType = {
	admin: AdminUser | null;
	loading: boolean;
};
const AdminUserContext = createContext<AdminUserContextType>({
	admin: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const AdminUserProvider = ({ children }: Props) => {
	// #region Hooks
	const { admin, loading } = useGetAdminUser();
	//#endregion

	return (
		<AdminUserContext.Provider value={{ admin, loading }}>{children}</AdminUserContext.Provider>
	);
};

// Hook
export const useAdminUser = () => useContext(AdminUserContext);
