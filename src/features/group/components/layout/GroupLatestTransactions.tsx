import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";
import GroupTransactionListItem from "../ui/GroupTransactionListItem";

const GroupLatestTransactions = () => {
	// #region Hooks
	const { group } = useGroup();
	//#endregion

	return (
		<View>
			<Section.Header>
				<Section.Title>Latest transactions</Section.Title>
				{(group?.transactions.length ?? 0) > 0 && (
					<Link href={`/groups/${group?.id}/transactions`}>
						<Section.Header.Link>See all</Section.Header.Link>
					</Link>
				)}
			</Section.Header>

			<ListContainer>
				{group?.transactions.length === 0 && (
					<Section.Empty icon="card-outline" text="No transactions." />
				)}
				{[
					...(group?.transactions ?? []).slice(0, 5).map((transaction) => (
						<Link
							key={transaction.id}
							href={`/groups/${group?.id}/transactions/${transaction.id}`}
							asChild
						>
							<GroupTransactionListItem transaction={transaction} />
						</Link>
					)),
				]}
			</ListContainer>
		</View>
	);
};

export default GroupLatestTransactions;
