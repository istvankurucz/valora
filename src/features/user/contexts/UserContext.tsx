import { createContext, PropsWithChildren, useContext } from "react";
import useGetUser from "../hooks/useGetUser";
import { User } from "../types/userTypes";

// Context
type UserContextType = {
	user: User | null;
	loading: boolean;
};
const UserContext = createContext<UserContextType>({
	user: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const UserProvider = ({ children }: Props) => {
	// #region Hooks
	const { user, loading } = useGetUser();
	//#endregion

	return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

// Hook
export const useUser = () => useContext(UserContext);
