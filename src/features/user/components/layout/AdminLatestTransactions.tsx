import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useAdminTransactions } from "../../contexts/AdminTransactionsContext";
import AdminTransactionListItem from "../ui/AdminTransactionListItem";

const AdminLatestTransactions = () => {
	// #region Hooks
	const { transactions } = useAdminTransactions();
	//#endregion

	return (
		<View>
			<Section.Header>
				<Section.Title>Latest transactions</Section.Title>
				{transactions.length > 0 && (
					<Link href="/home/transactions">
						<Section.Header.Link>See all</Section.Header.Link>
					</Link>
				)}
			</Section.Header>

			<ListContainer>
				{transactions.length === 0 && (
					<Section.Empty icon="card-outline" text="No transactions." />
				)}
				{[
					...transactions.slice(0, 5).map((transaction) => (
						<Link key={transaction.id} href={`/home/transactions/${transaction.id}`} asChild>
							<AdminTransactionListItem transaction={transaction} />
						</Link>
					)),
				]}
			</ListContainer>
		</View>
	);
};

export default AdminLatestTransactions;
