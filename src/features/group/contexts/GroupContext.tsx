import { createContext, PropsWithChildren, useContext } from "react";
import useGetGroup from "../hooks/useGetGroup";
import { Group } from "../types/groupTypes";

// Context
type GroupContextType = {
	group: Group | null;
	loading: boolean;
};
const GroupContext = createContext<GroupContextType>({
	group: null,
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const GroupProvider = ({ children }: Props) => {
	// #region Hooks
	const { group, loading } = useGetGroup();
	//#endregion

	return <GroupContext.Provider value={{ group, loading }}>{children}</GroupContext.Provider>;
};

// Hook
export const useGroup = () => useContext(GroupContext);
