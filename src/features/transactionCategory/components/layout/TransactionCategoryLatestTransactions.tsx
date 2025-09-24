import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useTransactionCategory } from "../../contexts/TransactionCategoryContext";
import TransactionCategoryTransactionListItem from "../ui/TransactionCategoryTransactionListItem";

const TransactionCategoryLatestTransactions = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	return (
		<View>
			<Section.Header>
				<Section.Title>Latest transactions</Section.Title>
				{(transactionCategory?.transactions.length ?? 0) > 0 && (
					<Link
						href={`/settings/transaction-categories/${transactionCategory?.id}/transactions`}
					>
						<Section.Header.Link>See all</Section.Header.Link>
					</Link>
				)}
			</Section.Header>

			<ListContainer>
				{transactionCategory?.transactions.length === 0 && (
					<Section.Empty icon="card-outline" text="No transactions." />
				)}
				{[
					...(transactionCategory?.transactions ?? []).slice(0, 5).map((transaction) => (
						<Link
							key={transaction.id}
							href={`/settings/transaction-categories/${transactionCategory?.id}/transactions/${transaction.id}`}
							asChild
						>
							<TransactionCategoryTransactionListItem transaction={transaction} />
						</Link>
					)),
				]}
			</ListContainer>
		</View>
	);
};

export default TransactionCategoryLatestTransactions;
