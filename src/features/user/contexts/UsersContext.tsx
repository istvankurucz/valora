import { createContext, PropsWithChildren, useContext } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { User } from "../types/userTypes";

// Context
type UsersContextType = {
	users: User[];
	loading: boolean;
};
const UsersContext = createContext<UsersContextType>({
	users: [],
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const UsersProvider = ({ children }: Props) => {
	// #region Hooks
	const { users, loading } = useGetUsers();
	//#endregion

	return <UsersContext.Provider value={{ users, loading }}>{children}</UsersContext.Provider>;
};

// Hook
export const useUsers = () => useContext(UsersContext);
