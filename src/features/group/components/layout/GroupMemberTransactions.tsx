import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { View } from "react-native";
import { useGroupMember } from "../../contexts/GroupMemberContext";
import GroupUserTransactionListItem from "../ui/GroupUserTransactionListItem";

const GroupMemberTransactions = () => {
	// #region Hooks
	const { member } = useGroupMember();
	//#endregion

	return (
		<View>
			<Section.Title>Transactions</Section.Title>

			<ListContainer>
				{member?.transactions.length === 0 && (
					<Section.Empty icon="card-outline" text="No transaction." />
				)}
				{member?.transactions.map((transaction) => (
					<GroupUserTransactionListItem key={transaction.id} transaction={transaction} />
				))}
			</ListContainer>
		</View>
	);
};

export default GroupMemberTransactions;
