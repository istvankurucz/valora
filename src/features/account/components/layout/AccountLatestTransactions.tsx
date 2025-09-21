import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useAccount } from "../../contexts/AccountContext";
import AccountTransactionListItem from "../ui/AccountTransactionListItem";

const AccountLatestTransactions = () => {
	// #region Hooks
	const { account } = useAccount();
	//#endregion

	return (
		<View>
			<Section.Header>
				<Section.Title>Latest transactions</Section.Title>
				{(account?.transactions.length ?? 0) > 0 && (
					<Link href={`/accounts/${account?.id}/transactions`}>
						<Section.Header.Link>See all</Section.Header.Link>
					</Link>
				)}
			</Section.Header>

			<ListContainer>
				{account?.transactions.length === 0 && (
					<Section.Empty icon="card-outline" text="No transactions." />
				)}
				{[
					...(account?.transactions ?? [])
						.slice(0, 5)
						.map((transaction) => (
							<AccountTransactionListItem key={transaction.id} transaction={transaction} />
						)),
				]}
			</ListContainer>
		</View>
	);
};

export default AccountLatestTransactions;
