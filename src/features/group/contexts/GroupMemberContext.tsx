import { useLocalSearchParams } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { GroupUserWithTransactions } from "../types/groupTypes";
import { useGroup } from "./GroupContext";

// Context
type GroupMemberContextType = {
	member: GroupUserWithTransactions | null;
};
const GroupMemberContext = createContext<GroupMemberContextType>({
	member: null,
});

// Provider
type Props = PropsWithChildren;

export const GroupMemberProvider = ({ children }: Props) => {
	//#region States
	const [member, setMember] = useState<GroupUserWithTransactions | null>(null);
	//#endregion

	// #region Hooks
	const { group } = useGroup();
	const { memberId } = useLocalSearchParams<{ memberId?: string }>();

	useEffect(() => {
		if (!group || !memberId) return;

		// Get member
		const memberData = group.users.find((user) => user.id === memberId);

		// Check member
		if (!memberData) return;

		// Get member transactions
		const transactions = group.transactions.filter(
			(transaction) => transaction.user.id === memberId
		);

		setMember({ ...memberData, transactions });
	}, [group, memberId]);
	//#endregion

	return <GroupMemberContext.Provider value={{ member }}>{children}</GroupMemberContext.Provider>;
};

// Hook
export const useGroupMember = () => useContext(GroupMemberContext);
