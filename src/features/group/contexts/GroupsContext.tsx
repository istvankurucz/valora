import { createContext, PropsWithChildren, useContext } from "react";
import useGetGroups from "../hooks/useGetGroups";
import { Group } from "../types/groupTypes";

// Context
type GroupsContextType = {
	groups: Group[];
	loading: boolean;
};
const GroupsContext = createContext<GroupsContextType>({
	groups: [],
	loading: true,
});

// Provider
type Props = PropsWithChildren;

export const GroupsProvider = ({ children }: Props) => {
	// #region Hooks
	const { groups, loading } = useGetGroups();
	//#endregion

	return <GroupsContext.Provider value={{ groups, loading }}>{children}</GroupsContext.Provider>;
};

// Hook
export const useGroups = () => useContext(GroupsContext);
